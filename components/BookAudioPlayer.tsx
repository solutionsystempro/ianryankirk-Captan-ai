
import React, { useState, useRef, useEffect } from 'react';

export const BookAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('6:30'); // Approximate for Chapter 1
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Note: Using a generic placeholder audio for demonstration.
  // In a real scenario, this would be the actual audiobook file.
  const AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      const prog = (current / total) * 100;
      setProgress(prog);
      
      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
      
      if (!isNaN(total)) {
        const dMins = Math.floor(total / 60);
        const dSecs = Math.floor(total % 60);
        setDuration(`${dMins}:${dSecs.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-md group hover:border-cyber-lime/30 transition-all duration-500">
      <audio 
        ref={audioRef} 
        src={AUDIO_SRC} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-6">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="w-16 h-16 flex-shrink-0 bg-cyber-lime rounded-full flex items-center justify-center text-background hover:scale-110 active:scale-95 transition-transform shadow-lg shadow-cyber-lime/20"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 text-left">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyber-lime">Audiobook Preview</p>
              <h4 className="font-display text-2xl tracking-tight text-off-white">Chapter 1: The Carpet</h4>
            </div>
            <span className="font-mono text-xs text-warm-gray">{currentTime} / {duration}</span>
          </div>

          {/* Progress Bar */}
          <div 
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden"
          >
            <div 
              className="absolute top-0 left-0 h-full bg-cyber-lime transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-2 mt-3 opacity-40 group-hover:opacity-100 transition-opacity">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className={`w-0.5 rounded-full bg-warm-gray transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                style={{ 
                  height: `${Math.random() * 16 + 4}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
