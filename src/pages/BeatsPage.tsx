import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Filter } from 'lucide-react';
import { BEATS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';

const BeatsPage: React.FC = () => {
  const { playBeat, setPlaylist } = usePlayer();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const genres = [...new Set(BEATS.map(b => b.genre))];
  const moods = [...new Set(BEATS.map(b => b.mood))];

  const filteredBeats = BEATS.filter(beat => {
    if (selectedGenre && beat.genre !== selectedGenre) return false;
    if (selectedMood && beat.mood !== selectedMood) return false;
    return true;
  });

  const handlePlayBeat = (beat: typeof BEATS[0]) => {
    setPlaylist(filteredBeats);
    playBeat(beat);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Browse Beats</h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Filter className="h-5 w-5" />
            <span className="font-semibold">Filters</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm text-zinc-400 mb-2">Genre</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenre === null
                      ? 'bg-purple-500 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  All
                </button>
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedGenre === genre
                        ? 'bg-purple-500 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-zinc-400 mb-2">Mood</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMood(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedMood === null
                      ? 'bg-purple-500 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  All
                </button>
                {moods.map(mood => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedMood === mood
                        ? 'bg-purple-500 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat, i) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
            >
              <div className="relative">
                <img
                  src={beat.artworkUrl}
                  alt={beat.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handlePlayBeat(beat)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
                  >
                    <Play className="h-6 w-6 text-white ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 truncate">{beat.title}</h3>
                <p className="text-zinc-400 text-sm mb-2">
                  {beat.genre} • {beat.bpm} BPM • {beat.key}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {beat.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-500 font-semibold">
                    ${beat.price.basic}+
                  </span>
                  <Link
                    to={`/beats/${beat.id}`}
                    className="text-sm text-zinc-400 hover:text-purple-500 transition-colors"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBeats.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">No beats found with these filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatsPage;
