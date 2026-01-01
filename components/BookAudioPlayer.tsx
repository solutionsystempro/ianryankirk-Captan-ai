
import React, { useState, useRef, useEffect } from 'react';

export const BookAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('6:12'); 
  const [loadError, setLoadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // File ID from: https://drive.google.com/file/d/1n-jmzybzPBVyAWxPvQ9NnC09hepHWDwh/view
  const FILE_ID = "1n-jmzybzPBVyAWxPvQ9NnC09hepHWDwh";
  
  /**
   * Google Drive Direct Link Strategy:
   * Format error (Code 4) typically means the link is reachable but the browser 
   * received HTML (like a "Virus Scan" landing page) instead of an audio stream.
   */
  const AUDIO_SRC = `https://docs.google.com/uc?id=${FILE_ID}`;

  const togglePlay = () => {
    if (audioRef.current && !loadError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Playback Exception Name:", String(err?.name));
            console.error("Playback Exception Message:", String(err?.message));
            
            if (err.name === 'NotAllowedError') {
              setErrorMessage("Click required to start");
            } else {
              setErrorMessage("Stream interrupted");
            }
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      
      if (!isNaN(total) && total > 0) {
        const prog = (current / total) * 100;
        setProgress(prog);
        
        const mins = Math.floor(current / 60);
        const secs = Math.floor(current % 60);
        setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
        
        const dMins = Math.floor(total / 60);
        const dSecs = Math.floor(total % 60);
        setDuration(`${dMins}:${dSecs.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current && !loadError) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      if (isFinite(audioRef.current.duration)) {
        audioRef.current.currentTime = percentage * audioRef.current.duration;
      }
    }
  };

  const onAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement;
    const error = target.error;
    let msg = "Source Error";
    
    if (error) {
      console.error("Audio Error Event Code:", error.code);
      console.error("Audio Error Event Message:", error.message || "No browser message");
      
      switch (error.code) {
        case 1: msg = "Load Aborted"; break;
        case 2: msg = "Network/CORS Error"; break;
        case 3: msg = "Decoding Failed"; break;
        case 4: msg = "Google Virus Scan Blocked Stream"; break;
        default: msg = `Error Code ${error.code}`; break;
      }
      
      // Specifically handle the "Format error" which is common for HTML landing pages from Google
      if (error.code === 4 || (error.message && error.message.includes('Format error'))) {
        msg = "Google Drive blocked the direct stream";
      }
    }
    
    setLoadError(true);
    setErrorMessage(msg);
  };

  return (
    <div className={`max-w-xl mx-auto bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-md group transition-all duration-500 ${loadError ? 'border-red-500/30' : 'hover:border-cyber-lime/30'}`}>
      <audio 
        ref={audioRef} 
        src={AUDIO_SRC}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={onAudioError}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
      
      <div className="flex items-center gap-6">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className={`w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center text-background transition-transform shadow-lg ${loadError ? 'bg-red-500/50 cursor-not-allowed' : 'bg-cyber-lime hover:scale-110 active:scale-95 shadow-cyber-lime/20'}`}
          title={loadError ? errorMessage : (isPlaying ? "Pause" : "Play")}
        >
          {loadError ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : isPlaying ? (
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyber-lime">
                {loadError ? 'Connection Issue' : 'Audiobook Preview'}
              </p>
              <h4 className="font-display text-2xl tracking-tight text-off-white">
                {loadError ? 'Stream Restricted' : 'Chapter 1: The Carpet'}
              </h4>
            </div>
            {!loadError && <span className="font-mono text-xs text-warm-gray">{currentTime} / {duration}</span>}
          </div>

          {/* Progress Bar */}
          <div 
            ref={progressBarRef}
            onClick={handleProgressClick}
            className={`relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden ${loadError ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}`}
          >
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-100 ${loadError ? 'bg-red-500' : 'bg-cyber-lime'}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-0.5 rounded-full bg-warm-gray transition-all duration-300 ${isPlaying && !loadError ? 'animate-pulse' : ''}`}
                  style={{ 
                    height: `${Math.random() * 16 + 4}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            
            <a 
              href={`https://drive.google.com/file/d/${FILE_ID}/view`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-cyber-lime hover:underline uppercase tracking-widest"
            >
              {loadError ? 'Open File Directly ↗' : 'Source Link ↗'}
            </a>
          </div>
        </div>
      </div>
      {loadError && (
        <p className="mt-4 text-[9px] font-mono text-warm-gray uppercase text-center tracking-widest opacity-60">
          Note: Google Drive often blocks direct streaming for security scans. Click "Open Directly" to listen.
        </p>
      )}
    </div>
  );
};
