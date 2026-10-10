import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, Filter, X, Volume2, Bookmark, RotateCcw, CheckCircle2 } from 'lucide-react';
import { WordEntry, CefrLevel, PartOfSpeech } from '../types/dictionary';
import { dictionaryEngine } from '../data/wordBank';
import { CEFR_LEVEL_SPECS } from '../data/cefrVocabularyIndex';
import { WordCard } from './WordCard';
import { WordDetailModal } from './WordDetailModal';
import { progressService } from '../services/progressService';
import { AccentType } from '../services/speechService';

interface DictionaryViewProps {
  onStartQuizWithWord?: (word: WordEntry) => void;
  initialLevel?: CefrLevel | 'ALL';
  accent: AccentType;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const POS_OPTIONS: { key: PartOfSpeech | 'ALL'; label: string; labelAr: string }[] = [
  { key: 'ALL', label: 'All Parts', labelAr: 'الكل' },
  { key: 'noun', label: 'Noun', labelAr: 'اسم' },
  { key: 'verb', label: 'Verb', labelAr: 'فعل' },
  { key: 'adjective', label: 'Adjective', labelAr: 'صفة' },
  { key: 'adverb', label: 'Adverb', labelAr: 'ظرف' },
  { key: 'preposition', label: 'Preposition', labelAr: 'حرف جر' },
];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  onStartQuizWithWord,
  initialLevel = 'ALL',
  accent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>(initialLevel);
  const [selectedPos, setSelectedPos] = useState<PartOfSpeech | 'ALL'>('ALL');
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false);
  const [filterReviewOnly, setFilterReviewOnly] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const [displayLimit, setDisplayLimit] = useState(36);

  // Sync if initialLevel changes
  useEffect(() => {
    setSelectedLevel(initialLevel);
  }, [initialLevel]);

  // Reset pagination on filter change
  useEffect(() => {
    setDisplayLimit(36);
  }, [searchQuery, selectedLevel, selectedPos, filterBookmarkedOnly, filterReviewOnly, activeLetter]);

  const bookmarkedWordsSet = useMemo(() => {
    return new Set(progressService.getBookmarkedWords());
  }, []);

  const reviewWordsSet = useMemo(() => {
    return new Set(progressService.getReviewWords());
  }, []);

  // Filtered dataset
  const filteredWords = useMemo(() => {
    let list: WordEntry[] = [];

    if (selectedLevel === 'ALL') {
      list = dictionaryEngine.getAllEntries();
    } else {
      list = dictionaryEngine.getEntriesByLevel(selectedLevel);
    }

    if (selectedPos !== 'ALL') {
      list = list.filter((w) => w.pos === selectedPos);
    }

    if (activeLetter) {
      list = list.filter((w) => w.word.toUpperCase().startsWith(activeLetter));
    }

    if (filterBookmarkedOnly) {
      list = list.filter((w) => bookmarkedWordsSet.has(w.word.toLowerCase()));
    }

    if (filterReviewOnly) {
      list = list.filter((w) => reviewWordsSet.has(w.word.toLowerCase()));
    }

    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter((item) => {
        return (
          item.word.toLowerCase().includes(q) ||
          item.arabic.includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          (item.topic && item.topic.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [
    selectedLevel,
    selectedPos,
    activeLetter,
    filterBookmarkedOnly,
    filterReviewOnly,
    searchQuery,
    bookmarkedWordsSet,
    reviewWordsSet,
  ]);

  const displayedWords = useMemo(() => {
    return filteredWords.slice(0, displayLimit);
  }, [filteredWords, displayLimit]);

  const handleRandomWord = () => {
    const all = dictionaryEngine.getAllEntries();
    const randomIndex = Math.floor(Math.random() * all.length);
    setSelectedWord(all[randomIndex]);
  };

  const totalCatalogCount = dictionaryEngine.getTotalCount();

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20,000 words in English or Arabic (ابحث بالإنجليزية أو العربية)..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Random word & Quick actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRandomWord}
              className="px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-600 hover:border-amber-400 transition-colors inline-flex items-center gap-1.5"
              title="Pick a random word"
            >
              <Sparkles size={15} className="text-amber-500" />
              <span>Random Word</span>
            </button>
          </div>
        </div>

        {/* CEFR Level Filter Row: Segmented Interactive Controls */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedLevel('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedLevel === 'ALL'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All Levels (20,000)
            </button>
            {CEFR_LEVEL_SPECS.map((spec) => (
              <button
                key={spec.level}
                type="button"
                onClick={() => setSelectedLevel(spec.level)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedLevel === spec.level
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <span>{spec.level}</span>
                <span className="ml-1 text-[11px] opacity-75 font-mono">
                  ({spec.count.toLocaleString()})
                </span>
              </button>
            ))}
          </div>

          {/* Secondary filter toggles: Part of speech & bookmarks */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value as PartOfSpeech | 'ALL')}
              className="text-xs py-1.5 px-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 focus:outline-hidden"
            >
              {POS_OPTIONS.map((pos) => (
                <option key={pos.key} value={pos.key}>
                  {pos.label} ({pos.labelAr})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setFilterBookmarkedOnly(!filterBookmarkedOnly)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1 ${
                filterBookmarkedOnly
                  ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Bookmark size={13} />
              <span>Saved</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterReviewOnly(!filterReviewOnly)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1 ${
                filterReviewOnly
                  ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <RotateCcw size={13} />
              <span>Review Queue</span>
            </button>
          </div>
        </div>

        {/* Alphabet Quick Jump Bar */}
        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveLetter(null)}
            className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
              activeLetter === null
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200 font-bold'
                : 'text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            A-Z
          </button>
          {ALPHABET.map((ltr) => (
            <button
              key={ltr}
              type="button"
              onClick={() => setActiveLetter(activeLetter === ltr ? null : ltr)}
              className={`w-6 h-6 flex items-center justify-center rounded text-xs font-mono transition-colors shrink-0 ${
                activeLetter === ltr
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {ltr}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
            {displayedWords.length.toLocaleString()}
          </span>
          <span>of</span>
          <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
            {filteredWords.length.toLocaleString()}
          </span>
          <span>words</span>
          {selectedLevel !== 'ALL' && (
            <>
              <span aria-hidden="true">·</span>
              <span>Level {selectedLevel}</span>
            </>
          )}
        </div>
        <span className="text-[11px] text-stone-400">
          Total Database: {totalCatalogCount.toLocaleString()} words (A1-C1)
        </span>
      </div>

      {/* Words Grid */}
      {displayedWords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedWords.map((entry) => (
            <WordCard
              key={entry.id}
              entry={entry}
              onSelect={(item) => setSelectedWord(item)}
              accent={accent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8">
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-3">
            No dictionary words matched your current filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedLevel('ALL');
              setSelectedPos('ALL');
              setActiveLetter(null);
              setFilterBookmarkedOnly(false);
              setFilterReviewOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {displayedWords.length < filteredWords.length && (
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => setDisplayLimit((prev) => prev + 48)}
            className="px-6 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:border-amber-400 hover:text-amber-600 transition-all shadow-xs"
          >
            Load Next 48 Words ({filteredWords.length - displayedWords.length} remaining)
          </button>
        </div>
      )}

      {/* Detailed Word Modal */}
      <WordDetailModal
        entry={selectedWord}
        onClose={() => setSelectedWord(null)}
        onStartQuizWithWord={onStartQuizWithWord}
      />
    </div>
  );
};
