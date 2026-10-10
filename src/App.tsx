import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { DictionaryView } from './components/DictionaryView';
import { QuizArena } from './components/QuizArena';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CefrLevelGuide } from './components/CefrLevelGuide';
import { CefrLevel, WordEntry } from './types/dictionary';
import { AccentType, speechService } from './services/speechService';
import { dictionaryEngine } from './data/wordBank';
import { Sparkles, BookOpen, Volume2, Trophy, HelpCircle, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dictionary');
  const [accent, setAccent] = useState<AccentType>('en-US');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('lexicon_theme') === 'dark' ||
        (!('lexicon_theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  const [selectedCefrFilter, setSelectedCefrFilter] = useState<CefrLevel | 'ALL'>('ALL');
  const [quizWordTarget, setQuizWordTarget] = useState<WordEntry | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lexicon_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lexicon_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAccentChange = (newAccent: AccentType) => {
    setAccent(newAccent);
    speechService.updateSettings({ accent: newAccent });
  };

  const handleStartQuizWithWord = (word: WordEntry) => {
    setQuizWordTarget(word);
    setActiveTab('quiz');
  };

  const handleSelectLevelFromGuide = (lvl: CefrLevel) => {
    setSelectedCefrFilter(lvl);
    setActiveTab('dictionary');
  };

  const handleStartLevelQuiz = (lvl: CefrLevel) => {
    setSelectedCefrFilter(lvl);
    setActiveTab('quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Bar following contract */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        accent={accent}
        onAccentChange={handleAccentChange}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onQuickPractice={() => {
          setActiveTab('quiz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Subtle Hero Kicker (No fake scoreboards, no pulsing dots, clean typography) */}
        {activeTab === 'dictionary' && (
          <div className="mb-6 pb-6 border-b border-stone-200/80 dark:border-stone-800 text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                  <span>English-Arabic Lexicon</span>
                  <span aria-hidden="true">·</span>
                  <span>CEFR A1 to C1 Framework</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
                  Comprehensive 20,000-Word Dictionary
                </h1>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                  Explore full English definitions and Arabic meanings, native audio pronunciations, contextual examples, and spaced-repetition quizzes.
                </p>
              </div>

              {/* Quick Jump Badges */}
              <div className="flex items-center gap-2 text-xs text-stone-500 shrink-0">
                <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">
                  20,000 Words Catalog
                </span>
                <span aria-hidden="true">·</span>
                <span>Audio for Every Entry</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'dictionary' && (
          <DictionaryView
            onStartQuizWithWord={handleStartQuizWithWord}
            initialLevel={selectedCefrFilter}
            accent={accent}
          />
        )}

        {activeTab === 'levels' && (
          <CefrLevelGuide
            onSelectLevel={handleSelectLevelFromGuide}
            onStartLevelQuiz={handleStartLevelQuiz}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizArena
            initialWord={quizWordTarget}
            accent={accent}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            onSwitchToQuiz={(level) => {
              if (level && level !== 'REVIEW') {
                setSelectedCefrFilter(level);
              }
              setActiveTab('quiz');
            }}
            accent={accent}
          />
        )}
      </main>

      {/* Clean, unboxed footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Lexicon CEFR Dictionary & Quiz
            </span>
            <span aria-hidden="true">·</span>
            <span>20,000 Words (A1, A2, B1, B2, C1)</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>Bilingual English & Arabic</span>
            <span aria-hidden="true">·</span>
            <span>Web Speech Audio API</span>
            <span aria-hidden="true">·</span>
            <span>Spaced Repetition Tracking</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
