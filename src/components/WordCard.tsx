import React from 'react';
import { Bookmark, BookmarkCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { WordEntry } from '../types/dictionary';
import { AudioButton } from './AudioButton';
import { progressService } from '../services/progressService';
import { AccentType } from '../services/speechService';

interface WordCardProps {
  entry: WordEntry;
  onSelect: (entry: WordEntry) => void;
  accent?: AccentType;
}

export const WordCard: React.FC<WordCardProps> = ({ entry, onSelect, accent = 'en-US' }) => {
  const progress = progressService.getWordProgress(entry.word);
  const [bookmarked, setBookmarked] = React.useState(progress.bookmarked);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = progressService.toggleBookmark(entry.word);
    setBookmarked(updated);
  };

  // Level colors as clean subtle typography tags (no heavy pill badge)
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'text-emerald-700 dark:text-emerald-400 font-semibold';
      case 'A2': return 'text-teal-700 dark:text-teal-400 font-semibold';
      case 'B1': return 'text-sky-700 dark:text-sky-400 font-semibold';
      case 'B2': return 'text-indigo-700 dark:text-indigo-400 font-semibold';
      case 'C1': return 'text-amber-700 dark:text-amber-400 font-semibold';
      default: return 'text-stone-700 dark:text-stone-300 font-semibold';
    }
  };

  return (
    <div
      onClick={() => onSelect(entry)}
      className="group relative flex flex-col justify-between p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl hover:border-amber-400/80 dark:hover:border-amber-500/60 hover:shadow-md transition-all cursor-pointer text-left"
    >
      <div>
        {/* Top Metadata Row: Zero-pill clean typographic layout */}
        <div className="flex items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 mb-2">
          <div className="flex items-center gap-2">
            <span className={getLevelColor(entry.cefr)}>{entry.cefr}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{entry.pos}</span>
            <span aria-hidden="true">·</span>
            <span className="font-arabic">{entry.posArabic}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {progress.status === 'mastered' && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 size={13} />
                <span>Mastered</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className="p-1 rounded-md text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              title={bookmarked ? 'Remove from bookmarks' : 'Bookmark word'}
              aria-label="Bookmark"
            >
              {bookmarked ? (
                <BookmarkCheck size={16} className="text-amber-600 dark:text-amber-400 fill-amber-500/20" />
              ) : (
                <Bookmark size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Word and Audio header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {entry.word}
            </h3>
            <span className="font-mono text-xs text-stone-500 dark:text-stone-400 tracking-wide">
              {entry.phonetic}
            </span>
          </div>
          <AudioButton word={entry.word} size="sm" accent={accent} />
        </div>

        {/* Arabic Translation: Crisp Arabic typography */}
        <div className="mt-2 mb-3 pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <p className="font-arabic text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug dir-rtl text-right">
            {entry.arabic}
          </p>
        </div>

        {/* English Definition */}
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {entry.definition}
        </p>
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 group-hover:text-stone-700 dark:group-hover:text-stone-300">
        <span className="truncate max-w-[190px] text-[11px]">
          {entry.topic || 'General Vocabulary'}
        </span>
        <span className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-medium">
          <span>Details</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
