import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Flame,
  Target,
  Bookmark,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Volume2,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { progressService } from '../services/progressService';
import { dictionaryEngine } from '../data/wordBank';
import { WordEntry, CefrLevel } from '../types/dictionary';
import { speechService, AccentType } from '../services/speechService';
import { WordDetailModal } from './WordDetailModal';

interface ProgressDashboardProps {
  onSwitchToQuiz: (level?: CefrLevel | 'ALL' | 'REVIEW') => void;
  accent: AccentType;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  onSwitchToQuiz,
  accent,
}) => {
  const [stats, setStats] = useState(progressService.getStats());
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'review' | 'bookmarks'>('overview');

  useEffect(() => {
    const unsub = progressService.subscribe(() => {
      setStats(progressService.getStats());
    });
    return () => unsub();
  }, []);

  const bookmarkedWords = progressService.getBookmarkedWords().map((w) => dictionaryEngine.getWord(w)).filter((w): w is WordEntry => Boolean(w));
  const reviewWords = progressService.getReviewWords().map((w) => dictionaryEngine.getWord(w)).filter((w): w is WordEntry => Boolean(w));

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your study statistics and saved progress?')) {
      progressService.resetProgress();
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Learning Progress & Mastery
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Track your vocabulary acquisition across 20,000 words from A1 to C1.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSwitchToQuiz('REVIEW')}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>Practice Review Queue</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-xs text-stone-400 hover:text-rose-600 transition-colors"
              title="Reset progress"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* High Level Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-100 dark:border-stone-800">
          <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
              <Flame size={15} className="text-amber-500" />
              <span>Daily Streak</span>
            </div>
            <p className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-50">
              {stats.streakDays} <span className="text-xs font-sans font-normal text-stone-400">days</span>
            </p>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Mastered Words</span>
            </div>
            <p className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              {stats.masteredCount}
            </p>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
              <RotateCcw size={15} className="text-amber-500" />
              <span>Needs Review</span>
            </div>
            <p className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
              {stats.reviewCount}
            </p>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
              <Trophy size={15} className="text-sky-500" />
              <span>Quiz Accuracy</span>
            </div>
            <p className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-50">
              {stats.overallAccuracy}%
            </p>
          </div>
        </div>
      </div>

      {/* Tabs: Overview, Review Queue, Bookmarked Words */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          CEFR Level Progress (A1-C1)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('review')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 ${
            activeTab === 'review'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <span>Needs Review Queue</span>
          <span className="font-mono text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
            {reviewWords.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <span>Saved Words</span>
          <span className="font-mono text-[10px] bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 px-1.5 py-0.5 rounded-full">
            {bookmarkedWords.length}
          </span>
        </button>
      </div>

      {/* Tab 1: CEFR Level Progress Breakdown */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            Vocabulary Levels Breakdown (A1 to C1)
          </h3>

          <div className="space-y-4">
            {stats.levelStats.map((item) => (
              <div
                key={item.level}
                className="p-4 border border-stone-100 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-800/30"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      Level {item.level}
                    </span>
                    <span aria-hidden="true" className="text-stone-400">·</span>
                    <span className="text-stone-500">
                      {item.total.toLocaleString()} Words in Catalog
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {item.mastered} Mastered
                    </span>
                    <button
                      type="button"
                      onClick={() => onSwitchToQuiz(item.level)}
                      className="text-amber-600 dark:text-amber-400 hover:underline font-semibold ml-2 inline-flex items-center gap-0.5"
                    >
                      <span>Quiz Level</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.percent, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Needs Review Queue */}
      {activeTab === 'review' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Spaced Repetition Review Queue
              </h3>
              <p className="text-xs text-stone-500">
                Words that you answered incorrectly in quizzes or marked for review.
              </p>
            </div>
            {reviewWords.length > 0 && (
              <button
                type="button"
                onClick={() => onSwitchToQuiz('REVIEW')}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors"
              >
                Start Review Quiz
              </button>
            )}
          </div>

          {reviewWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {reviewWords.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedWord(entry)}
                  className="p-3.5 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-amber-400 cursor-pointer flex items-center justify-between transition-colors bg-white dark:bg-stone-800/40"
                >
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{entry.word}</h4>
                    <p className="font-arabic text-xs text-stone-500 mt-0.5">{entry.arabic}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(entry.word, accent);
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-stone-400 text-xs">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2 opacity-80" />
              <p>Your review queue is clear! Keep taking quizzes to identify words to master.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved / Bookmarked Words */}
      {activeTab === 'bookmarks' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              Saved Vocabulary (المفردات المحفوظة)
            </h3>
            <p className="text-xs text-stone-500">
              Personal word collection for fast reference and study.
            </p>
          </div>

          {bookmarkedWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {bookmarkedWords.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedWord(entry)}
                  className="p-3.5 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-amber-400 cursor-pointer flex items-center justify-between transition-colors bg-white dark:bg-stone-800/40"
                >
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{entry.word}</h4>
                    <p className="font-arabic text-xs text-stone-500 mt-0.5">{entry.arabic}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(entry.word, accent);
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-stone-400 text-xs">
              <Bookmark size={32} className="mx-auto text-stone-300 dark:text-stone-700 mb-2" />
              <p>No saved words yet. Click the bookmark icon on any dictionary word to add it here.</p>
            </div>
          )}
        </div>
      )}

      {/* Word Detail Modal */}
      <WordDetailModal
        entry={selectedWord}
        onClose={() => setSelectedWord(null)}
        onStartQuizWithWord={() => onSwitchToQuiz()}
      />
    </div>
  );
};
