import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Beat } from '../types';

interface PlayerContextType {
  currentBeat: Beat | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playBeat: (beat: Beat) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  nextBeat: () => void;
  previousBeat: () => void;
  playlist: Beat[];
  setPlaylist: (beats: Beat[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [playlist, setPlaylist] = useState<Beat[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        nextBeat();
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playBeat = (beat: Beat) => {
    if (audioRef.current) {
      audioRef.current.src = beat.audioUrl;
      audioRef.current.play();
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current && currentBeat) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  const nextBeat = () => {
    if (!currentBeat || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(b => b.id === currentBeat.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playBeat(playlist[nextIndex]);
  };

  const previousBeat = () => {
    if (!currentBeat || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(b => b.id === currentBeat.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    playBeat(playlist[prevIndex]);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentBeat,
        isPlaying,
        currentTime,
        duration,
        volume,
        playBeat,
        togglePlay,
        seekTo,
        setVolume,
        nextBeat,
        previousBeat,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
