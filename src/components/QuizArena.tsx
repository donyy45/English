import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Brain,
  Headphones,
  FileText,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CefrLevel, QuizModeType, QuizQuestion, WordEntry } from '../types/dictionary';
import { QuizService } from '../services/quizService';
import { speechService, AccentType } from '../services/speechService';
import { progressService } from '../services/progressService';

interface QuizArenaProps {
  initialWord?: WordEntry | null;
  accent: AccentType;
}

export const QuizArena: React.FC<QuizArenaProps> = ({ initialWord, accent }) => {
  const [mode, setMode] = useState<QuizModeType>('en-to-ar');
  const [level, setLevel] = useState<CefrLevel | 'ALL' | 'REVIEW'>('ALL');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);

  // Session Results
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [answeredLog, setAnsweredLog] = useState<{ word: string; correct: boolean }[]>([]);

  // Start new quiz
  const startQuiz = (targetMode = mode, targetLevel = level, targetCount = questionCount) => {
    const generated = QuizService.generateQuiz({
      mode: targetMode,
      level: targetLevel,
      questionCount: targetCount,
    });
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setTypedInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setFlashcardFlipped(false);
    setAnsweredLog([]);

    // Speak first question word if listening/spelling
    if (generated.length > 0) {
      setTimeout(() => {
        speechService.speak(generated[0].word.word, accent);
      }, 250);
    }
  };

  useEffect(() => {
    startQuiz();
  }, [mode, level, questionCount]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    const correct = option.trim() === currentQ.correctAnswer.trim();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    // Save to user progress
    progressService.recordQuizAnswer(currentQ.word.word, correct);
    setAnsweredLog((prev) => [...prev, { word: currentQ.word.word, correct }]);
  };

  const handleCheckSpelling = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !typedInput.trim()) return;

    const cleanInput = typedInput.toLowerCase().trim();
    const correct = cleanInput === currentQ.correctAnswer.toLowerCase().trim();

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    progressService.recordQuizAnswer(currentQ.word.word, correct);
    setAnsweredLog((prev) => [...prev, { word: currentQ.word.word, correct }]);
  };

  const handleFlashcardChoice = (mastered: boolean) => {
    progressService.recordQuizAnswer(currentQ.word.word, mastered);
    setAnsweredLog((prev) => [...prev, { word: currentQ.word.word, correct: mastered }]);
    if (mastered) {
      setScore((prev) => prev + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setTypedInput('');
      setIsAnswered(false);
      setIsCorrect(false);
      setFlashcardFlipped(false);

      // Speak next word
      const nextQ = questions[nextIdx];
      if (nextQ) {
        setTimeout(() => {
          speechService.speak(nextQ.word.word, accent);
        }, 150);
      }
    } else {
      // Completed quiz
      setIsFinished(true);
      const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
      progressService.recordQuizSession({
        mode,
        level,
        total: questions.length,
        correct: score + (isCorrect && !isFinished ? 1 : 0),
        incorrect: questions.length - (score + (isCorrect && !isFinished ? 1 : 0)),
        accuracy,
        timestamp: Date.now(),
        answeredWords: answeredLog,
      });
    }
  };

  const modeDescriptions: Record<QuizModeType, { title: string; desc: string; icon: any }> = {
    'en-to-ar': {
      title: 'English to Arabic',
      desc: 'Listen and identify the correct Arabic meaning',
      icon: HelpCircle,
    },
    'ar-to-en': {
      title: 'Arabic to English',
      desc: 'Match Arabic definitions to English words',
      icon: FileText,
    },
    definition: {
      title: 'Definition Match',
      desc: 'Identify the word matching standard English definitions',
      icon: Brain,
    },
    spelling: {
      title: 'Listening & Spelling',
      desc: 'Listen to native pronunciation and type the correct English spelling',
      icon: Headphones,
    },
    flashcards: {
      title: 'Smart Flashcards',
      desc: 'Bilingual flip cards with spaced repetition self-rating',
      icon: Layers,
    },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Quiz Controls & Mode Ribbon */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 md:p-6 shadow-xs text-left">
        {/* Modes segmented buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl overflow-x-auto mb-4">
          {(['en-to-ar', 'ar-to-en', 'definition', 'spelling', 'flashcards'] as QuizModeType[]).map((m) => {
            const Icon = modeDescriptions[m].icon;
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <Icon size={14} className={active ? 'text-amber-600' : ''} />
                <span>{modeDescriptions[m].title}</span>
              </button>
            );
          })}
        </div>

        {/* Level and Count Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">CEFR Target:</span>
            <div className="flex items-center gap-1">
              {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'REVIEW'] as (CefrLevel | 'ALL' | 'REVIEW')[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    level === lvl
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {lvl === 'REVIEW' ? 'Review Queue' : lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Questions:</span>
            {[5, 10, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                  questionCount === num
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => startQuiz()}
              className="ml-2 px-3 py-1 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
              title="Restart with new words"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      {!isFinished && currentQ ? (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm text-left">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
            <span>
              Question <strong className="text-stone-800 dark:text-stone-200">{currentIndex + 1}</strong> of{' '}
              {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-600 font-semibold">Score: {score}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 font-semibold">{currentQ.word.cefr}</span>
            </div>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden mb-8">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Flashcard Mode View */}
          {mode === 'flashcards' ? (
            <div className="space-y-6">
              <div
                onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                className="relative min-h-[220px] p-8 border-2 border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-400 transition-all bg-stone-50/50 dark:bg-stone-800/30"
              >
                {!flashcardFlipped ? (
                  <div>
                    <span className="text-xs text-stone-400 font-mono uppercase tracking-wider mb-2 block">
                      Tap card to flip
                    </span>
                    <h3 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
                      {currentQ.word.word}
                    </h3>
                    <p className="font-mono text-sm text-stone-500 mt-2">{currentQ.word.phonetic}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(currentQ.word.word, accent);
                      }}
                      className="mt-4 p-2 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-amber-600 shadow-xs"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <p className="font-arabic text-3xl font-bold text-stone-900 dark:text-stone-50 mb-3 dir-rtl text-center">
                      {currentQ.word.arabic}
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 max-w-md mx-auto leading-relaxed mb-4">
                      {currentQ.word.definition}
                    </p>
                    {currentQ.word.examples[0] && (
                      <p className="text-xs text-stone-500 italic max-w-md mx-auto">
                        “{currentQ.word.examples[0]}”
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Flashcard Response Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleFlashcardChoice(false)}
                  className="px-6 py-2.5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw size={15} />
                  <span>Needs Review (تحتاج مراجعة)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFlashcardChoice(true)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 size={15} />
                  <span>I Know This (أتقنتها)</span>
                </button>
              </div>
            </div>
          ) : mode === 'spelling' ? (
            /* Listening & Spelling Mode View */
            <div className="space-y-6">
              <div className="p-6 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 rounded-xl text-center">
                <button
                  type="button"
                  onClick={() => speechService.speak(currentQ.word.word, accent)}
                  className="w-16 h-16 rounded-full bg-amber-600 text-white inline-flex items-center justify-center hover:bg-amber-700 active:scale-95 transition-all shadow-md mx-auto mb-3"
                  title="Play audio pronunciation"
                >
                  <Volume2 size={28} />
                </button>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Click the speaker button to hear the English word.
                </p>
                <p className="font-arabic text-xl font-bold text-stone-800 dark:text-stone-200 mt-3 dir-rtl">
                  المعنى: {currentQ.word.arabic}
                </p>
              </div>

              <form onSubmit={handleCheckSpelling} className="space-y-3">
                <input
                  type="text"
                  autoFocus
                  disabled={isAnswered}
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Type the English spelling here..."
                  className="w-full px-4 py-3 text-lg font-mono text-center bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden disabled:opacity-75"
                />

                {!isAnswered ? (
                  <button
                    type="submit"
                    disabled={!typedInput.trim()}
                    className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40"
                  >
                    Check Spelling
                  </button>
                ) : (
                  <div className="space-y-3 animate-in fade-in">
                    <div
                      className={`p-4 rounded-xl border flex items-start gap-3 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200'
                          : 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" /> : <XCircle size={20} className="shrink-0 text-rose-600 mt-0.5" />}
                      <div>
                        <p className="font-bold text-sm">
                          {isCorrect ? 'Excellent! Correct spelling.' : `Incorrect spelling. Correct: "${currentQ.word.word}"`}
                        </p>
                        <p className="text-xs mt-1 opacity-90">{currentQ.explanation}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="w-full py-3 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Continue</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            /* Multiple Choice Modes View */
            <div className="space-y-6">
              {/* Question Prompt */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-50 leading-snug">
                    {mode === 'en-to-ar' ? (
                      <span className="flex items-center gap-3">
                        <span>What is the Arabic meaning of:</span>
                        <span className="text-amber-600 underline underline-offset-4 font-mono font-extrabold">
                          {currentQ.word.word}
                        </span>
                      </span>
                    ) : (
                      currentQ.prompt
                    )}
                  </h3>
                  {mode === 'en-to-ar' && (
                    <p className="font-mono text-xs text-stone-500 mt-1">{currentQ.word.phonetic}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => speechService.speak(currentQ.word.word, accent)}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:text-amber-600 transition-colors shrink-0"
                  title="Pronounce word"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options?.map((option, idx) => {
                  const isThisSelected = selectedOption === option;
                  const isThisCorrect = option.trim() === currentQ.correctAnswer.trim();

                  let buttonStyles =
                    'border-stone-200 dark:border-stone-700/80 bg-stone-50/50 dark:bg-stone-800/40 hover:border-amber-400 hover:bg-amber-50/20';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      buttonStyles =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                    } else if (isThisSelected) {
                      buttonStyles =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 font-semibold ring-1 ring-rose-500';
                    } else {
                      buttonStyles = 'opacity-40 border-stone-200 dark:border-stone-800';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(option)}
                      className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${buttonStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-mono flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span
                          className={`text-sm ${
                            mode === 'en-to-ar' ? 'font-arabic text-base font-medium' : 'font-medium'
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle size={18} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Continue */}
              {isAnswered && (
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3 animate-in fade-in">
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200'
                        : 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="shrink-0 text-rose-600 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider mb-1">
                        {isCorrect ? 'Correct Answer!' : 'Needs Review'}
                      </p>
                      <p className="text-xs leading-relaxed opacity-90">{currentQ.explanation}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="w-full py-3 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Next Question</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 md:p-12 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <Trophy size={32} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
              Quiz Completed!
            </h3>
            <p className="text-sm text-stone-500 mt-1">
              You scored <strong className="text-stone-800 dark:text-stone-100">{score}</strong> out of{' '}
              <strong className="text-stone-800 dark:text-stone-100">{questions.length}</strong> (
              {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}% accuracy)
            </p>
          </div>

          {/* Breakdown summary */}
          <div className="max-w-md mx-auto p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 text-left text-xs space-y-2">
            <div className="font-semibold text-stone-700 dark:text-stone-300 pb-2 border-b border-stone-200 dark:border-stone-700 flex justify-between">
              <span>Words Reviewed</span>
              <span>Status</span>
            </div>
            {answeredLog.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-1">
                <span className="font-mono">{item.word}</span>
                {item.correct ? (
                  <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    Correct
                  </span>
                ) : (
                  <span className="text-rose-600 font-semibold inline-flex items-center gap-1">
                    <XCircle size={13} />
                    Added to Review
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => startQuiz()}
              className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw size={15} />
              <span>Practice Again</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLevel('REVIEW');
                startQuiz(mode, 'REVIEW');
              }}
              className="px-6 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:border-amber-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Practice Review Queue Only</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
