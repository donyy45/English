import React, { useState } from 'react';
import { X, Volume2, Bookmark, BookmarkCheck, CheckCircle2, RotateCcw, BookOpen, Layers } from 'lucide-react';
import { WordEntry, WordStatus } from '../types/dictionary';
import { speechService } from '../services/speechService';
import { progressService } from '../services/progressService';

interface WordDetailModalProps {
  entry: WordEntry | null;
  onClose: () => void;
  onStartQuizWithWord?: (word: WordEntry) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  entry,
  onClose,
  onStartQuizWithWord,
}) => {
  if (!entry) return null;

  const progress = progressService.getWordProgress(entry.word);
  const [currentStatus, setCurrentStatus] = useState<WordStatus>(progress.status);
  const [bookmarked, setBookmarked] = useState(progress.bookmarked);
  const [isSpeakingUs, setIsSpeakingUs] = useState(false);
  const [isSpeakingUk, setIsSpeakingUk] = useState(false);
  const [isSpeakingAr, setIsSpeakingAr] = useState(false);

  const handlePlayUs = async () => {
    setIsSpeakingUs(true);
    await speechService.speak(entry.word, 'en-US');
    setIsSpeakingUs(false);
  };

  const handlePlayUk = async () => {
    setIsSpeakingUk(true);
    await speechService.speak(entry.word, 'en-GB');
    setIsSpeakingUk(false);
  };

  const handlePlaySlow = async () => {
    const orig = speechService.getSettings().rate;
    speechService.updateSettings({ rate: 0.7 });
    await speechService.speak(entry.word, 'en-US');
    speechService.updateSettings({ rate: orig });
  };

  const handlePlayArabic = async () => {
    setIsSpeakingAr(true);
    await speechService.speakArabic(entry.arabic);
    setIsSpeakingAr(false);
  };

  const handleBookmarkToggle = () => {
    const updated = progressService.toggleBookmark(entry.word);
    setBookmarked(updated);
  };

  const handleStatusChange = (status: WordStatus) => {
    progressService.markWordStatus(entry.word, status);
    setCurrentStatus(status);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-bold text-amber-700 dark:text-amber-400">CEFR {entry.cefr}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{entry.pos}</span>
            <span aria-hidden="true">·</span>
            <span className="font-arabic font-medium">{entry.posArabic}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBookmarkToggle}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              title={bookmarked ? 'Bookmarked' : 'Add bookmark'}
            >
              {bookmarked ? (
                <BookmarkCheck size={18} className="text-amber-600 fill-amber-500/20" />
              ) : (
                <Bookmark size={18} className="text-stone-500" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-500 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Word + Audio Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
            <div>
              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
                {entry.word}
              </h2>
              <p className="font-mono text-sm text-stone-500 dark:text-stone-400 mt-1">
                {entry.phonetic}
              </p>
            </div>

            {/* Audio action controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePlayUs}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-400 hover:text-amber-600 transition-all ${
                  isSpeakingUs ? 'ring-2 ring-amber-500 text-amber-600' : ''
                }`}
              >
                <Volume2 size={15} />
                <span>US (American)</span>
              </button>

              <button
                type="button"
                onClick={handlePlayUk}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-400 hover:text-amber-600 transition-all ${
                  isSpeakingUk ? 'ring-2 ring-amber-500 text-amber-600' : ''
                }`}
              >
                <Volume2 size={15} />
                <span>UK (British)</span>
              </button>

              <button
                type="button"
                onClick={handlePlaySlow}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400 transition-all"
                title="Slow audio pronunciation (0.7x)"
              >
                <span>Slow 0.7x</span>
              </button>
            </div>
          </div>

          {/* Arabic Meaning Section */}
          <div className="p-5 bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                المعنى باللغة العربية (Arabic Meaning)
              </span>
              <button
                type="button"
                onClick={handlePlayArabic}
                className={`inline-flex items-center gap-1 text-xs text-stone-500 hover:text-amber-600 transition-colors ${
                  isSpeakingAr ? 'text-amber-600 font-semibold' : ''
                }`}
                title="استمع للنطق العربي"
              >
                <Volume2 size={14} />
                <span>نطق عربي</span>
              </button>
            </div>
            <p className="font-arabic text-2xl font-bold text-stone-900 dark:text-stone-50 leading-relaxed text-right dir-rtl">
              {entry.arabic}
            </p>
            {entry.arabicAlts && entry.arabicAlts.length > 0 && (
              <div className="mt-2 pt-2 border-t border-stone-200/50 dark:border-stone-700/50 text-right dir-rtl">
                <span className="text-xs text-stone-500 font-arabic ml-2">مرادفات أخرى:</span>
                <span className="text-sm text-stone-700 dark:text-stone-300 font-arabic font-medium">
                  {entry.arabicAlts.join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* English Definition */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              English Definition
            </h4>
            <p className="text-sm md:text-base text-stone-800 dark:text-stone-200 leading-relaxed">
              {entry.definition}
            </p>
          </div>

          {/* Example Sentences */}
          {entry.examples && entry.examples.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Examples in Context (أمثلة في سياق)
              </h4>
              <div className="space-y-3">
                {entry.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-800 rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                        “{example}”
                      </p>
                      <button
                        type="button"
                        onClick={() => speechService.speak(example)}
                        className="text-stone-400 hover:text-amber-600 p-1 shrink-0"
                        title="Listen to full sentence"
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                    {entry.examplesArabic && entry.examplesArabic[idx] && (
                      <p className="mt-2 text-xs font-arabic text-stone-600 dark:text-stone-400 text-right dir-rtl font-normal border-t border-stone-200/40 dark:border-stone-700/40 pt-2">
                        “{entry.examplesArabic[idx]}”
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Synonyms & Collocations if available */}
          {entry.synonyms && entry.synonyms.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Synonyms & Related Terms
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-stone-600 dark:text-stone-400">
                {entry.synonyms.map((syn, i) => (
                  <span key={i} className="font-mono bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md">
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learning Progress Controller */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Your Learning Status (حالة الحفظ)
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('mastered')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                  currentStatus === 'mastered'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 hover:border-emerald-500 text-stone-700 dark:text-stone-300'
                }`}
              >
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Mastered (أتقنتها)</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('review')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                  currentStatus === 'review'
                    ? 'border-amber-600 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'border-stone-200 dark:border-stone-700 hover:border-amber-500 text-stone-700 dark:text-stone-300'
                }`}
              >
                <RotateCcw size={15} className="text-amber-600" />
                <span>Needs Review (تحتاج مراجعة)</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange('learning')}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                  currentStatus === 'learning'
                    ? 'border-sky-600 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                    : 'border-stone-200 dark:border-stone-700 hover:border-sky-500 text-stone-700 dark:text-stone-300'
                }`}
              >
                <BookOpen size={15} className="text-sky-600" />
                <span>Currently Learning (قيد التعلم)</span>
              </button>

              {onStartQuizWithWord && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartQuizWithWord(entry);
                  }}
                  className="ml-auto px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Layers size={15} />
                  <span>Practice In Quiz</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
