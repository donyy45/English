import { CefrLevel, ProgressState, UserWordProgress, WordStatus, QuizSessionSummary } from '../types/dictionary';
import { dictionaryEngine } from '../data/wordBank';

const STORAGE_KEY = 'lexicon_cefr_progress_v1';
const QUIZ_HISTORY_KEY = 'lexicon_cefr_quiz_history_v1';

class ProgressService {
  private static instance: ProgressService;
  private state: ProgressState;
  private listeners: Set<(state: ProgressState) => void> = new Set();

  private constructor() {
    this.state = this.loadState();
    this.checkDailyStreak();
  }

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  private loadState(): ProgressState {
    if (typeof window === 'undefined') {
      return this.getDefaultState();
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse progress from localStorage:', e);
    }
    return this.getDefaultState();
  }

  private getDefaultState(): ProgressState {
    const today = new Date().toISOString().split('T')[0];
    return {
      words: {},
      streakDays: 1,
      lastActiveDate: today,
      totalQuizzesTaken: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      dailyGoal: 10,
      todayPracticedCount: 0,
    };
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  public subscribe(callback: (state: ProgressState) => void): () => void {
    this.listeners.add(callback);
    callback(this.state);
    return () => this.listeners.delete(callback);
  }

  public getState(): ProgressState {
    return { ...this.state };
  }

  private checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (this.state.lastActiveDate !== today) {
      const lastDate = new Date(this.state.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        this.state.streakDays += 1;
      } else if (diffDays > 1) {
        this.state.streakDays = 1;
      }
      this.state.lastActiveDate = today;
      this.state.todayPracticedCount = 0;
      this.saveState();
    }
  }

  public getWordProgress(word: string): UserWordProgress {
    const key = word.toLowerCase().trim();
    return this.state.words[key] || {
      status: 'unseen',
      correctCount: 0,
      incorrectCount: 0,
      bookmarked: false,
    };
  }

  public toggleBookmark(word: string): boolean {
    const key = word.toLowerCase().trim();
    const current = this.getWordProgress(key);
    const newBookmarked = !current.bookmarked;

    this.state.words[key] = {
      ...current,
      bookmarked: newBookmarked,
    };
    this.saveState();
    return newBookmarked;
  }

  public markWordStatus(word: string, status: WordStatus) {
    const key = word.toLowerCase().trim();
    const current = this.getWordProgress(key);

    this.state.words[key] = {
      ...current,
      status,
      lastPracticed: Date.now(),
    };
    this.state.todayPracticedCount += 1;
    this.saveState();
  }

  public recordQuizAnswer(word: string, isCorrect: boolean) {
    const key = word.toLowerCase().trim();
    const current = this.getWordProgress(key);

    const newCorrect = isCorrect ? current.correctCount + 1 : current.correctCount;
    const newIncorrect = !isCorrect ? current.incorrectCount + 1 : current.incorrectCount;

    // Automatic mastery or review logic
    let newStatus: WordStatus = current.status;
    if (isCorrect && newCorrect >= 3 && newIncorrect === 0) {
      newStatus = 'mastered';
    } else if (!isCorrect) {
      newStatus = 'review';
    } else if (current.status === 'unseen') {
      newStatus = 'learning';
    }

    this.state.words[key] = {
      ...current,
      status: newStatus,
      correctCount: newCorrect,
      incorrectCount: newIncorrect,
      lastPracticed: Date.now(),
    };

    this.state.totalQuestionsAnswered += 1;
    if (isCorrect) {
      this.state.totalCorrectAnswers += 1;
    }
    this.state.todayPracticedCount += 1;

    this.saveState();
  }

  public recordQuizSession(summary: QuizSessionSummary) {
    this.state.totalQuizzesTaken += 1;
    this.saveState();

    if (typeof window === 'undefined') return;
    try {
      const historyStr = localStorage.getItem(QUIZ_HISTORY_KEY);
      const history: QuizSessionSummary[] = historyStr ? JSON.parse(historyStr) : [];
      history.unshift(summary);
      // Keep last 30 quizzes
      localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
    } catch (e) {
      console.warn('Failed to save quiz history:', e);
    }
  }

  public getQuizHistory(): QuizSessionSummary[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(QUIZ_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public getBookmarkedWords(): string[] {
    return Object.entries(this.state.words)
      .filter(([_, p]) => p.bookmarked)
      .map(([w]) => w);
  }

  public getReviewWords(): string[] {
    return Object.entries(this.state.words)
      .filter(([_, p]) => p.status === 'review')
      .map(([w]) => w);
  }

  public getMasteredWords(): string[] {
    return Object.entries(this.state.words)
      .filter(([_, p]) => p.status === 'mastered')
      .map(([w]) => w);
  }

  public getStats() {
    let masteredCount = 0;
    let learningCount = 0;
    let reviewCount = 0;
    let bookmarkedCount = 0;

    for (const p of Object.values(this.state.words)) {
      if (p.status === 'mastered') masteredCount++;
      else if (p.status === 'learning') learningCount++;
      else if (p.status === 'review') reviewCount++;
      if (p.bookmarked) bookmarkedCount++;
    }

    const totalPracticed = masteredCount + learningCount + reviewCount;
    const overallAccuracy =
      this.state.totalQuestionsAnswered > 0
        ? Math.round((this.state.totalCorrectAnswers / this.state.totalQuestionsAnswered) * 100)
        : 100;

    // CEFR level stats
    const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const levelStats = levels.map((lvl) => {
      const totalInLevel = dictionaryEngine.getCountByLevel(lvl);
      // count how many in this level are mastered
      let masteredInLvl = 0;
      let learningInLvl = 0;
      for (const [w, p] of Object.entries(this.state.words)) {
        const entry = dictionaryEngine.getWord(w);
        if (entry && entry.cefr === lvl) {
          if (p.status === 'mastered') masteredInLvl++;
          if (p.status === 'learning' || p.status === 'review') learningInLvl++;
        }
      }
      return {
        level: lvl,
        total: totalInLevel,
        mastered: masteredInLvl,
        learning: learningInLvl,
        percent: totalInLevel > 0 ? Math.min(100, Math.round((masteredInLvl / totalInLevel) * 100)) : 0,
      };
    });

    return {
      totalWordsDatabase: dictionaryEngine.getTotalCount(),
      totalPracticed,
      masteredCount,
      learningCount,
      reviewCount,
      bookmarkedCount,
      streakDays: this.state.streakDays,
      dailyGoal: this.state.dailyGoal,
      todayPracticedCount: this.state.todayPracticedCount,
      totalQuizzesTaken: this.state.totalQuizzesTaken,
      overallAccuracy,
      levelStats,
    };
  }

  public resetProgress() {
    this.state = this.getDefaultState();
    this.saveState();
    if (typeof window !== 'undefined') {
      localStorage.removeItem(QUIZ_HISTORY_KEY);
    }
  }
}

export const progressService = ProgressService.getInstance();
