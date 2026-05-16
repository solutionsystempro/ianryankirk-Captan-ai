import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export function BookAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('--:--');
  const audioRef = useRef<HTMLAudioElement>(null);

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
    const fmt = (s: number) =>
      `${Math.floor(s / 60)}:${Math.floor(s % 60)
        .toString()
        .padStart(2, '0')}`;
    setCurrentTime(fmt(el.currentTime));
    setDuration(fmt(el.duration));
  };

  return (
    <button
      onClick={togglePlay}
      className={`w-full relative flex items-center gap-3 rounded-full px-3 py-2.5 border transition-all overflow-hidden ${
        isPlaying
          ? 'bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(170,255,0,0.15)]'
          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-accent/40'
      }`}
    >
      <audio
        ref={audioRef}
        src="/chapter-1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Play/pause icon */}
      <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-accent text-background">
        {isPlaying ? (
          <Pause className="w-4 h-4" fill="currentColor" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        )}
      </span>

      {/* Text */}
      <div className="flex-1 text-left min-w-0">
        <div className="text-sm font-medium text-off-white truncate">
          Introduction: The Architecture
        </div>
        <div className="text-[11px] text-warm-gray mt-0.5 tabular-nums">
          {currentTime} / {duration}
        </div>
      </div>

      {/* Thin progress bar at the bottom edge */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all" style={{ width: `${progress}%` }} />
    </button>
  );
}
