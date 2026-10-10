import React from 'react';
import { BookOpen, CheckCircle, ArrowRight, Layers } from 'lucide-react';
import { CefrLevel } from '../types/dictionary';
import { CEFR_LEVEL_SPECS } from '../data/cefrVocabularyIndex';

interface CefrLevelGuideProps {
  onSelectLevel: (level: CefrLevel) => void;
  onStartLevelQuiz: (level: CefrLevel) => void;
}

export const CefrLevelGuide: React.FC<CefrLevelGuideProps> = ({
  onSelectLevel,
  onStartLevelQuiz,
}) => {
  const levelDetails: Record<
    CefrLevel,
    {
      title: string;
      titleAr: string;
      targetAudience: string;
      competencies: string[];
      accentColor: string;
    }
  > = {
    A1: {
      title: 'Breakthrough / Beginner',
      titleAr: 'المستوى المبتدئ الأساسي',
      targetAudience: 'Survival English, basic everyday greetings, food, numbers, and personal information.',
      competencies: [
        'Understand and use familiar everyday expressions and basic phrases.',
        'Introduce yourself and others, ask and answer personal questions.',
        'Interact in a simple way if the other person talks slowly and clearly.',
      ],
      accentColor: 'text-emerald-700 dark:text-emerald-400',
    },
    A2: {
      title: 'Waystage / Elementary',
      titleAr: 'المستوى الابتدائي',
      targetAudience: 'Routine exchanges, shopping, local geography, and daily employment.',
      competencies: [
        'Understand sentences and frequently used expressions related to immediate areas of relevance.',
        'Communicate in simple and routine tasks requiring a direct exchange of information.',
        'Describe in simple terms aspects of background, immediate environment, and immediate needs.',
      ],
      accentColor: 'text-teal-700 dark:text-teal-400',
    },
    B1: {
      title: 'Threshold / Intermediate',
      titleAr: 'المستوى المتوسط',
      targetAudience: 'Independent user, travel situations, work meetings, personal interests, and opinions.',
      competencies: [
        'Understand the main points of clear standard input on familiar matters in work, school, and leisure.',
        'Deal with most travel situations likely to arise while traveling in an English-speaking area.',
        'Produce simple connected text on topics that are familiar or of personal interest.',
        'Describe experiences, events, dreams, hopes, and give brief reasons and explanations.',
      ],
      accentColor: 'text-sky-700 dark:text-sky-400',
    },
    B2: {
      title: 'Vantage / Upper Intermediate',
      titleAr: 'المستوى فوق المتوسط',
      targetAudience: 'Complex texts, spontaneous fluency with native speakers, academic argumentation.',
      competencies: [
        'Understand the main ideas of complex text on both concrete and abstract topics.',
        'Interact with a degree of fluency and spontaneity that makes regular interaction with native speakers effortless.',
        'Produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue.',
      ],
      accentColor: 'text-indigo-700 dark:text-indigo-400',
    },
    C1: {
      title: 'Effective Operational Proficiency / Advanced',
      titleAr: 'المستوى المتقدم والطلاقة الأكاديمية',
      targetAudience: 'Demanding longer texts, flexible professional and academic discourse, implicit nuances.',
      competencies: [
        'Understand a wide range of demanding, longer texts, and recognize implicit meaning.',
        'Express ideas fluently and spontaneously without much obvious searching for expressions.',
        'Use language flexibly and effectively for social, academic, and professional purposes.',
        'Produce clear, well-structured, detailed text on complex subjects with controlled use of organizational patterns.',
      ],
      accentColor: 'text-amber-700 dark:text-amber-400',
    },
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
          CEFR Vocabulary Framework (A1 to C1)
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-3xl leading-relaxed">
          The Common European Framework of Reference for Languages (CEFR) standardizes language proficiency across 6 international tiers. This dictionary encompasses 20,000 words mapped across the 5 primary learning levels from A1 through C1, complete with English definitions and Arabic meanings.
        </p>
      </div>

      {/* Grid of CEFR Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CEFR_LEVEL_SPECS.map((spec) => {
          const detail = levelDetails[spec.level];
          return (
            <div
              key={spec.level}
              className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/80 transition-all shadow-xs"
            >
              <div>
                {/* Level Title and Count */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-extrabold ${detail.accentColor}`}>
                      {spec.level}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="font-arabic font-bold text-base text-stone-800 dark:text-stone-200">
                      {detail.titleAr}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-stone-500 font-semibold bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                    {spec.count.toLocaleString()} words
                  </span>
                </div>

                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  {detail.title}
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                  {detail.targetAudience}
                </p>

                {/* Key competencies */}
                <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                    Core Competencies:
                  </span>
                  {detail.competencies.map((comp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                      <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span className="leading-snug">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectLevel(spec.level)}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-800 dark:text-stone-200 hover:text-amber-600 transition-colors inline-flex items-center justify-center gap-1"
                >
                  <BookOpen size={13} />
                  <span>Explore {spec.level}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onStartLevelQuiz(spec.level)}
                  className="py-2 px-3 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors inline-flex items-center gap-1 shadow-xs"
                >
                  <Layers size={13} />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
