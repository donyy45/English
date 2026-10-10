import React from 'react';
import { Volume2, Moon, Sun, Layers } from 'lucide-react';
import { AccentType } from '../services/speechService';

export type NavTab = 'dictionary' | 'levels' | 'quiz' | 'progress' | 'saved';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  accent: AccentType;
  onAccentChange: (accent: AccentType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onQuickPractice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  accent,
  onAccentChange,
  darkMode,
  onToggleDarkMode,
  onQuickPractice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <div
          onClick={() => onTabChange('dictionary')}
          className="cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-lg md:text-xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
            Lexicon <span className="text-amber-600 font-black">CEFR</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-mono font-medium text-stone-400 dark:text-stone-500">
            20,000 Words
          </span>
        </div>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            type="button"
            onClick={() => onTabChange('dictionary')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-stone-900 dark:hover:text-stone-50 ${
              activeTab === 'dictionary'
                ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600'
                : ''
            }`}
          >
            Dictionary
          </button>
          <button
            type="button"
            onClick={() => onTabChange('levels')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-stone-900 dark:hover:text-stone-50 ${
              activeTab === 'levels'
                ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600'
                : ''
            }`}
          >
            CEFR Levels
          </button>
          <button
            type="button"
            onClick={() => onTabChange('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-stone-900 dark:hover:text-stone-50 ${
              activeTab === 'quiz'
                ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600'
                : ''
            }`}
          >
            Quiz Arena
          </button>
          <button
            type="button"
            onClick={() => onTabChange('progress')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-stone-900 dark:hover:text-stone-50 ${
              activeTab === 'progress'
                ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-600'
                : ''
            }`}
          >
            My Progress
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Accent & Theme toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Accent Voice Switcher */}
          <div className="hidden sm:flex items-center rounded-lg border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-50 dark:bg-stone-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => onAccentChange('en-US')}
              className={`px-2 py-1 rounded-md transition-colors ${
                accent === 'en-US'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="American English Pronunciation"
            >
              US
            </button>
            <button
              type="button"
              onClick={() => onAccentChange('en-GB')}
              className={`px-2 py-1 rounded-md transition-colors ${
                accent === 'en-GB'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="British English Pronunciation"
            >
              UK
            </button>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onQuickPractice}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 shadow-xs"
          >
            <Layers size={14} />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex md:hidden border-t border-stone-200 dark:border-stone-800 overflow-x-auto px-4 py-2 gap-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => onTabChange('dictionary')}
          className={`whitespace-nowrap ${
            activeTab === 'dictionary' ? 'text-amber-600 font-bold' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Dictionary
        </button>
        <button
          type="button"
          onClick={() => onTabChange('levels')}
          className={`whitespace-nowrap ${
            activeTab === 'levels' ? 'text-amber-600 font-bold' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Levels
        </button>
        <button
          type="button"
          onClick={() => onTabChange('quiz')}
          className={`whitespace-nowrap ${
            activeTab === 'quiz' ? 'text-amber-600 font-bold' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Quiz
        </button>
        <button
          type="button"
          onClick={() => onTabChange('progress')}
          className={`whitespace-nowrap ${
            activeTab === 'progress' ? 'text-amber-600 font-bold' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          Progress
        </button>
      </div>
    </header>
  );
};
