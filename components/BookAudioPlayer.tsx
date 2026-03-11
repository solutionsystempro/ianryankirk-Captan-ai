import React, { useState, useRef } from 'react';

export const BookAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('--:--');
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el || isNaN(el.duration)) return;
    setProgress((el.currentTime / el.duration) * 100);
    const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    setCurrentTime(fmt(el.currentTime));
    setDuration(fmt(el.duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    const bar = progressBarRef.current;
    if (!el || !bar || !isFinite(el.duration)) return;
    const rect = bar.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * el.duration;
  };

  // Static waveform heights — stable across renders
  const BARS = [6, 14, 10, 18, 8, 20, 12, 16, 7, 19, 11, 15];

  return (
    <div className="glass-card p-6 group hover:border-accent/25 transition-all duration-500">
      <audio
        ref={audioRef}
        src="/chapter-1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        preload="metadata"
      />

      <div className="flex items-center gap-5">
        {/* Play button */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 flex-shrink-0 bg-accent flex items-center justify-center text-background transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,255,0,0.35)] active:scale-95"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-2">
            <div>
              <p className="label-tag text-accent mb-0.5">Audiobook Preview</p>
              <h4 className="font-display text-xl tracking-tight text-off-white leading-none">
                Chapter 1: The Carpet
              </h4>
            </div>
            <span className="font-mono text-[11px] text-warm-gray tabular-nums flex-shrink-0 ml-4">
              {currentTime} / {duration}
            </span>
          </div>

          {/* Progress bar */}
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-1 w-full bg-white/8 cursor-pointer mb-3"
          >
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Waveform visualizer */}
          <div className="flex items-end gap-[3px] h-5 opacity-30 group-hover:opacity-70 transition-opacity duration-500">
            {BARS.map((h, i) => (
              <div
                key={i}
                className={`w-0.5 bg-accent rounded-full transition-all duration-150 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
                style={{
                  height: `${h}px`,
                  animationDelay: `${i * 80}ms`,
                  transform: isPlaying ? `scaleY(${0.6 + Math.sin(Date.now() / 200 + i) * 0.4})` : 'scaleY(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
