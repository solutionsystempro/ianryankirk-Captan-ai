import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BookAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('--:--');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated visualizer bars for a premium waveform look
  const BARS_COUNT = 40;
  const [bars, setBars] = useState<number[]>(Array(BARS_COUNT).fill(15));
  const animationRef = useRef<number>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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

  // Animate the waveform when playing
  useEffect(() => {
    if (isPlaying) {
      const updateBars = () => {
        setBars(Array.from({ length: BARS_COUNT }, () => Math.floor(Math.random() * 80) + 20));
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(updateBars, 100);
        });
      };
      updateBars();
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setBars(Array(BARS_COUNT).fill(15)); // Reset to flat height
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="bento-card p-6 md:p-8 relative overflow-hidden group">
      {/* Background Glow */}
      <div 
        className={`absolute inset-0 bg-accent/5 blur-[80px] transition-opacity duration-1000 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <audio
        ref={audioRef}
        src="/chapter-1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Top Info */}
        <div className="w-full flex justify-between items-start">
          <div>
            <span className="pill-tag pill-tag-lime mb-3">
              {isPlaying && <span className="live-dot" />}
              Audiobook Preview
            </span>
            <h4 className="font-display text-2xl tracking-tight text-off-white">
              Introduction: The Architecture
            </h4>
          </div>
          <button
            onClick={toggleMute}
            className="text-warm-gray hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Big Central Play Button */}
        <div className="relative my-4">
          <div
            className={`absolute inset-0 bg-accent/30 rounded-full blur-xl transition-all duration-700 ${
              isPlaying ? 'scale-[2.5] opacity-100' : 'scale-100 opacity-0 group-hover:opacity-100'
            }`}
          />
          <button
            onClick={togglePlay}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
              isPlaying 
                ? 'bg-accent text-background shadow-[0_0_40px_rgba(170,255,0,0.6)]' 
                : 'bg-white/5 border border-white/20 text-white hover:border-accent hover:text-accent backdrop-blur-md'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            )}
          </button>
        </div>

        {/* Custom Visualizer & Progress */}
        <div className="w-full space-y-3">
          {/* Waveform */}
          <div className="w-full flex items-end justify-center gap-[2px] h-12">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                className="w-full max-w-[3px] rounded-t-sm"
                style={{ 
                  backgroundColor: isPlaying ? '#AAFF00' : 'rgba(255,255,255,0.1)',
                }}
                animate={{ height: `${height}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.15 }}
              />
            ))}
          </div>

          {/* Simple Progress Track */}
          <div className="w-full flex items-center gap-4">
            <span className="font-mono text-[10px] text-warm-gray">{currentTime}</span>
            <div className="h-1 bg-white/10 flex-1 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
            <span className="font-mono text-[10px] text-warm-gray">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
