export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'idiom'
  | 'phrase';

export interface WordEntry {
  id: string;
  word: string;
  phonetic: string;
  pos: PartOfSpeech;
  posArabic: string;
  cefr: CefrLevel;
  arabic: string;
  arabicAlts?: string[];
  definition: string;
  examples: string[];
  examplesArabic?: string[];
  topic?: string;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
}

export type WordStatus = 'unseen' | 'learning' | 'mastered' | 'review';

export interface UserWordProgress {
  status: WordStatus;
  lastPracticed?: number;
  correctCount: number;
  incorrectCount: number;
  bookmarked: boolean;
  notes?: string;
}

export interface ProgressState {
  words: Record<string, UserWordProgress>;
  streakDays: number;
  lastActiveDate: string;
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  dailyGoal: number; // e.g. 15 words
  todayPracticedCount: number;
}

export type QuizModeType =
  | 'en-to-ar'
  | 'ar-to-en'
  | 'definition'
  | 'spelling'
  | 'flashcards';

export interface QuizQuestion {
  id: string;
  type: QuizModeType;
  word: WordEntry;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizSessionSummary {
  mode: QuizModeType;
  level: CefrLevel | 'ALL' | 'REVIEW';
  total: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  timestamp: number;
  answeredWords: { word: string; correct: boolean }[];
}
