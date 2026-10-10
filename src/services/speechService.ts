export type AccentType = 'en-US' | 'en-GB' | 'en-AU';

export interface SpeechSettings {
  accent: AccentType;
  rate: number; // 0.75, 1.0, 1.25
  volume: number;
}

class SpeechService {
  private static instance: SpeechService;
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeaking: boolean = false;
  private listeners: Set<(isSpeaking: boolean, currentWord: string | null) => void> = new Set();
  private currentWord: string | null = null;

  private settings: SpeechSettings = {
    accent: 'en-US',
    rate: 1.0,
    volume: 1.0,
  };

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getSettings(): SpeechSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<SpeechSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public subscribe(callback: (isSpeaking: boolean, currentWord: string | null) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(isSpeaking: boolean, word: string | null) {
    this.isSpeaking = isSpeaking;
    this.currentWord = word;
    this.listeners.forEach((listener) => listener(isSpeaking, word));
  }

  public speak(text: string, overrideAccent?: AccentType): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Speech synthesis not supported in this browser.');
        resolve();
        return;
      }

      // Stop any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = overrideAccent || this.settings.accent;
      utterance.lang = targetLang;
      utterance.rate = this.settings.rate;
      utterance.volume = this.settings.volume;

      // Find best matching voice
      const targetVoice = this.voices.find(
        (v) => v.lang === targetLang || v.lang.replace('_', '-').startsWith(targetLang)
      ) || this.voices.find((v) => v.lang.startsWith('en'));

      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      utterance.onstart = () => {
        this.notify(true, text);
      };

      utterance.onend = () => {
        this.notify(false, null);
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.notify(false, null);
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  public speakArabic(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;

      const arabicVoice = this.voices.find((v) => v.lang.startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onstart = () => this.notify(true, text);
      utterance.onend = () => {
        this.notify(false, null);
        resolve();
      };
      utterance.onerror = () => {
        this.notify(false, null);
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false, null);
    }
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  public getSpeakingWord(): string | null {
    return this.currentWord;
  }
}

export const speechService = SpeechService.getInstance();
