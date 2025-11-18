import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Beat } from '../types';
import { usePlayer } from '../contexts/PlayerContext';

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg>
);

const BeatCard: React.FC<{ beat: Beat; playlist?: Beat[] }> = ({ beat, playlist }) => {
    const { playBeat, currentBeat, isPlaying } = usePlayer();
    const isCurrentlyPlaying = currentBeat?.id === beat.id && isPlaying;

    const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (playlist) {
            playBeat(beat, playlist);
        } else {
            playBeat(beat);
        }
    }
    
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-all duration-300"
        >
            <Link to={`/beats/${beat.id}`} className="block">
                <div className="relative overflow-hidden">
                    <img src={beat.artworkUrl} alt={beat.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
            </Link>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                    onClick={handlePlayClick}
                    className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-black shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform duration-200"
                    aria-label={isCurrentlyPlaying ? `Pause ${beat.title}` : `Play ${beat.title}`}
                >
                    {isCurrentlyPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-base text-zinc-100 truncate group-hover:text-white transition-colors duration-200">{beat.title}</h3>
                <p className="text-sm text-zinc-400">{beat.genre} &bull; {beat.bpm} BPM</p>
                <p className="font-semibold text-amber-500 mt-2">${beat.price.basic} USD</p>
            </div>
        </motion.div>
    );
};

export default BeatCard;
