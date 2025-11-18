import React, { useState, useMemo, useEffect } from 'react';
import { useBeats } from '../hooks/useBeats';
import BeatCard from '../components/BeatCard';
import { usePlayer } from '../contexts/PlayerContext';

const BeatsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All');
    const [mood, setMood] = useState('All');
    const { setPlaylist } = usePlayer();
    const { data: beats, isLoading } = useBeats();

    const genres = useMemo(() => {
        if (!beats) return ['All'];
        return ['All', ...Array.from(new Set(beats.map(b => b.genre)))];
    }, [beats]);
    
    const moods = useMemo(() => {
        if (!beats) return ['All'];
        return ['All', ...Array.from(new Set(beats.map(b => b.mood)))];
    }, [beats]);

    const filteredBeats = useMemo(() => {
        if (!beats) return [];
        return beats.filter(beat => {
            const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) || beat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesGenre = genre === 'All' || beat.genre === genre;
            const matchesMood = mood === 'All' || beat.mood === mood;
            return matchesSearch && matchesGenre && matchesMood;
        });
    }, [beats, searchTerm, genre, mood]);

    useEffect(() => {
        if (filteredBeats.length > 0) {
            setPlaylist(filteredBeats);
        }
    }, [filteredBeats, setPlaylist]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">Beat Library</h1>
                <p className="mt-4 text-lg text-zinc-400">Search, filter, and find the perfect instrumental for your next project.</p>
            </div>

            {/* Filters */}
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 border border-zinc-700/50 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex-grow relative z-10">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by title or tag (e.g., 'synth', 'dark')"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-800/80 backdrop-blur-sm text-white placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full md:w-48 h-12 px-4 rounded-xl bg-zinc-800/80 backdrop-blur-sm text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 cursor-pointer hover:border-purple-500/50">
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select value={mood} onChange={e => setMood(e.target.value)} className="w-full md:w-48 h-12 px-4 rounded-xl bg-zinc-800/80 backdrop-blur-sm text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 cursor-pointer hover:border-purple-500/50">
                        {moods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            {/* Beat Grid */}
            {isLoading ? (
                <div className="text-center text-zinc-400 py-12">
                    <p>Loading beats...</p>
                </div>
            ) : filteredBeats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBeats.map(beat => (
                        <BeatCard key={beat.id} beat={beat} playlist={filteredBeats} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-zinc-400 py-12 bg-zinc-900/30 rounded-2xl backdrop-blur-sm border border-zinc-800">
                    <p className="text-lg font-medium mb-2">No Beats Found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default BeatsPage;