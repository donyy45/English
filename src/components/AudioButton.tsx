import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { speechService, AccentType } from '../services/speechService';

interface AudioButtonProps {
  word: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentType;
  showAccentLabel?: boolean;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  word,
  size = 'md',
  accent = 'en-US',
  showAccentLabel = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking, currentWord) => {
      setIsPlaying(speaking && currentWord?.toLowerCase() === word.toLowerCase());
    });
    return () => unsubscribe();
  }, [word]);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.speak(word, accent);
  };

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 17,
    lg: 20,
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={`Listen to pronunciation (${accent === 'en-US' ? 'American US' : 'British UK'})`}
      className={`inline-flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 active:scale-95 transition-all shadow-xs ${sizeClasses[size]} ${
        isPlaying ? 'ring-2 ring-amber-500 border-amber-500 text-amber-600' : ''
      } ${className}`}
      aria-label={`Pronounce ${word}`}
    >
      <Volume2
        size={iconSizes[size]}
        className={`transition-transform ${isPlaying ? 'scale-110 text-amber-600' : ''}`}
      />
      {showAccentLabel && (
        <span className="ml-1 text-[10px] font-mono font-medium text-stone-500 uppercase">
          {accent === 'en-US' ? 'US' : 'UK'}
        </span>
      )}
    </button>
  );
};
