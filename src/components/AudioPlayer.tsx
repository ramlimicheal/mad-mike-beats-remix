import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

const AudioPlayer: React.FC = () => {
  const {
    currentBeat,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seek,
    nextTrack,
    prevTrack,
  } = usePlayer();

  if (!currentBeat) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Beat Info */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <img
              src={currentBeat.artworkUrl}
              alt={currentBeat.title}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentBeat.title}
              </p>
              <p className="text-xs text-zinc-400 truncate">
                {currentBeat.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <button
                onClick={prevTrack}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlayPause}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl flex items-center gap-2">
              <span className="text-xs text-zinc-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={e => seek(Number(e.target.value))}
                className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${progress}%, #3f3f46 ${progress}%, #3f3f46 100%)`
                }}
              />
              <span className="text-xs text-zinc-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume - Removed as not in new PlayerContext */}
          <div className="min-w-[120px]"></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
