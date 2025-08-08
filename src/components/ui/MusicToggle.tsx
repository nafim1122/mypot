'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element on client-side only
  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Volume slider */}
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div 
              className="absolute bottom-16 right-2 bg-dark-light p-3 rounded-lg border border-primary/20 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 mb-2 bg-light/30 rounded-lg appearance-none cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Volume button */}
        <motion.button
          className="bg-dark-light p-2 rounded-full border border-primary/30 shadow-lg hover:shadow-primary/20 focus:outline-none group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
          onClick={togglePlay}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          <div className="w-10 h-10 flex items-center justify-center relative">
            {/* Play/Pause icon */}
            {playing ? (
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H6v16h4V4zm8 0h-4v16h4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.14v14l11-7l-11-7z" />
              </svg>
            )}
            
            {/* Animated sound waves when playing */}
            {playing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{
                        height: ['15%', '70%', '40%', '95%', '15%'],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default MusicToggle;
