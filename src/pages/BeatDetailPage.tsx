import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ShoppingCart, Music, Clock, Key, Tag } from 'lucide-react';
import { BEATS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';
import { useCart } from '../contexts/CartContext';

const BeatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playBeat, setPlaylist } = usePlayer();
  const { addToCart } = useCart();
  const [selectedLicense, setSelectedLicense] = useState<'basic' | 'premium' | 'exclusive'>('basic');

  const beat = BEATS.find(b => b.id === Number(id));

  if (!beat) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Beat Not Found</h1>
          <Link to="/beats" className="text-purple-500 hover:text-purple-400">
            ← Back to Beats
          </Link>
        </div>
      </div>
    );
  }

  const handlePlayBeat = () => {
    setPlaylist(BEATS);
    playBeat(beat);
  };

  const handleAddToCart = () => {
    addToCart(beat, selectedLicense);
  };

  const licenseOptions = [
    { key: 'basic' as const, label: 'Basic', price: beat.price.basic },
    { key: 'premium' as const, label: 'Premium', price: beat.price.premium },
    { key: 'exclusive' as const, label: 'Exclusive', price: beat.price.exclusive },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/beats" className="text-purple-500 hover:text-purple-400 mb-8 inline-block">
          ← Back to Beats
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Artwork & Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group mb-6">
              <img
                src={beat.artworkUrl}
                alt={beat.title}
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button
                  onClick={handlePlayBeat}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
                >
                  <Play className="h-10 w-10 text-white ml-1" />
                </button>
              </div>
            </div>

            {beat.soundCloudUrl && (
              <div className="bg-zinc-900 p-4 rounded-lg">
                <p className="text-sm text-zinc-400 mb-2">SoundCloud Preview</p>
                <a
                  href={beat.soundCloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-400 text-sm"
                >
                  Listen on SoundCloud →
                </a>
              </div>
            )}
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">{beat.title}</h1>
            <p className="text-zinc-400 text-lg mb-6">by {beat.artist}</p>

            {/* Beat Details */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-zinc-500">BPM</p>
                  <p className="text-white font-semibold">{beat.bpm}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-zinc-500">Key</p>
                  <p className="text-white font-semibold">{beat.key}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-zinc-500">Genre</p>
                  <p className="text-white font-semibold">{beat.genre}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-zinc-500">Mood</p>
                  <p className="text-white font-semibold">{beat.mood}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm text-zinc-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {beat.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* License Selection */}
            <div className="mb-8">
              <p className="text-lg font-semibold text-white mb-4">Select License</p>
              <div className="space-y-3">
                {licenseOptions.map(option => (
                  <button
                    key={option.key}
                    onClick={() => setSelectedLicense(option.key)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedLicense === option.key
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{option.label}</span>
                      <span className="text-purple-500 font-bold text-xl">
                        ${option.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart - ${beat.price[selectedLicense]}
            </button>

            <Link
              to="/licensing"
              className="block text-center mt-4 text-sm text-purple-500 hover:text-purple-400"
            >
              View License Details →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BeatDetailPage;
