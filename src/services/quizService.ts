import { WordEntry, CefrLevel, QuizModeType, QuizQuestion } from '../types/dictionary';
import { dictionaryEngine } from '../data/wordBank';
import { progressService } from './progressService';

export class QuizService {
  public static generateQuiz(params: {
    mode: QuizModeType;
    level: CefrLevel | 'ALL' | 'REVIEW';
    questionCount?: number;
  }): QuizQuestion[] {
    const count = params.questionCount || 10;
    let pool: WordEntry[] = [];

    if (params.level === 'REVIEW') {
      const reviewWords = progressService.getReviewWords();
      pool = reviewWords
        .map((w) => dictionaryEngine.getWord(w))
        .filter((w): w is WordEntry => Boolean(w));

      if (pool.length === 0) {
        // Fallback if review list is empty: pick random entries
        pool = dictionaryEngine.getAllEntries().slice(0, 50);
      }
    } else if (params.level === 'ALL') {
      pool = dictionaryEngine.getAllEntries();
    } else {
      pool = dictionaryEngine.getEntriesByLevel(params.level);
    }

    if (pool.length === 0) {
      pool = dictionaryEngine.getAllEntries();
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, Math.min(count, pool.length));

    const questions: QuizQuestion[] = selectedWords.map((word, index) => {
      return this.createQuestion(word, params.mode, index, pool);
    });

    return questions;
  }

  private static createQuestion(
    word: WordEntry,
    mode: QuizModeType,
    index: number,
    pool: WordEntry[]
  ): QuizQuestion {
    // Generate 3 distractors
    const distractors = this.getDistractors(word, pool, 3);

    if (mode === 'en-to-ar') {
      const options = [word.arabic, ...distractors.map((d) => d.arabic)].sort(() => 0.5 - Math.random());
      return {
        id: `q-${index}-${word.id}`,
        type: 'en-to-ar',
        word,
        prompt: `What is the correct Arabic meaning for "${word.word}"?`,
        options,
        correctAnswer: word.arabic,
        explanation: `"${word.word}" (${word.pos}) means: ${word.arabic}. Definition: ${word.definition}`,
      };
    }

    if (mode === 'ar-to-en') {
      const options = [word.word, ...distractors.map((d) => d.word)].sort(() => 0.5 - Math.random());
      return {
        id: `q-${index}-${word.id}`,
        type: 'ar-to-en',
        word,
        prompt: `ما هي الكلمة الإنجليزية المناسبة للمعنى: "${word.arabic}"؟`,
        options,
        correctAnswer: word.word,
        explanation: `"${word.word}" (${word.cefr}) means: ${word.arabic}`,
      };
    }

    if (mode === 'definition') {
      const options = [word.word, ...distractors.map((d) => d.word)].sort(() => 0.5 - Math.random());
      return {
        id: `q-${index}-${word.id}`,
        type: 'definition',
        word,
        prompt: `Which word matches this definition?\n"${word.definition}"`,
        options,
        correctAnswer: word.word,
        explanation: `"${word.word}" (${word.pos}): ${word.definition}. Arabic: ${word.arabic}`,
      };
    }

    if (mode === 'spelling') {
      return {
        id: `q-${index}-${word.id}`,
        type: 'spelling',
        word,
        prompt: `Listen to the pronunciation and spell the word (${word.pos}):\n"${word.arabic}"`,
        correctAnswer: word.word.toLowerCase().trim(),
        explanation: `Correct spelling: "${word.word}". IPA: ${word.phonetic}. Arabic: ${word.arabic}`,
      };
    }

    // Flashcards
    return {
      id: `q-${index}-${word.id}`,
      type: 'flashcards',
      word,
      prompt: word.word,
      correctAnswer: word.arabic,
      explanation: `${word.definition}\n${word.examples[0] || ''}`,
    };
  }

  private static getDistractors(target: WordEntry, pool: WordEntry[], count: number): WordEntry[] {
    const sameLevelOrGeneral = pool.filter((w) => w.word !== target.word);
    const shuffled = [...sameLevelOrGeneral].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
