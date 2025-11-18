import React, { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react';
import { Beat } from '../types';

interface PlayerContextType {
  currentBeat: Beat | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playBeat: (beat: Beat, playlist?: Beat[]) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setPlaylist: (beats: Beat[]) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [playlist, setPlaylistState] = useState<Beat[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio play failed:", e));
    }
  }, [isPlaying]);

  const playBeat = useCallback((beat: Beat, newPlaylist?: Beat[]) => {
    if (newPlaylist) {
      setPlaylistState(newPlaylist);
    }

    if (audioRef.current && currentBeat?.id === beat.id) {
      togglePlayPause();
      return;
    }

    setCurrentBeat(beat);
    if (audioRef.current) {
      audioRef.current.src = beat.audioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio play failed:", e));
    }
  }, [currentBeat, togglePlayPause]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const setPlaylist = (beats: Beat[]) => {
    setPlaylistState(beats);
  };
  
  const handleNextTrack = useCallback(() => {
    if (playlist.length === 0 || !currentBeat) return;
    const currentIndex = playlist.findIndex(b => b.id === currentBeat.id);
    if (currentIndex > -1) {
        const nextIndex = (currentIndex + 1) % playlist.length;
        playBeat(playlist[nextIndex]);
    }
  }, [playlist, currentBeat, playBeat]);

  const nextTrack = () => {
    handleNextTrack();
  };

  const prevTrack = () => {
    if (playlist.length === 0 || !currentBeat) return;
    const currentIndex = playlist.findIndex(b => b.id === currentBeat.id);
     if (currentIndex > -1) {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playBeat(playlist[prevIndex]);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentBeat, isPlaying, duration, currentTime, playBeat, togglePlayPause, seek, setPlaylist, nextTrack, prevTrack }}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextTrack}
      />
    </PlayerContext.Provider>
  );
};
