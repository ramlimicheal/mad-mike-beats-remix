import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BEATS } from '../constants';
import { useCart } from '../contexts/CartContext';
import { SoundCloudEmbed } from './SoundCloudEmbed';

export const FeaturedBeats: React.FC = () => {
  // Get first 3 beats as featured
  const featuredBeats = BEATS.slice(0, 3);
  
  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Featured Beats
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Start Listening Now
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Preview our top beats and purchase instantly with flexible licensing options
          </p>
        </div>

        {/* Featured Beats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredBeats.map((beat) => (
            <FeaturedBeatCard key={beat.id} beat={beat} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/beats"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <span>View All Beats</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface FeaturedBeatCardProps {
  beat: typeof BEATS[0];
}

const FeaturedBeatCard: React.FC<FeaturedBeatCardProps> = ({ beat }) => {
  const { addToCart } = useCart();
  const [selectedLicense, setSelectedLicense] = useState<'basic' | 'premium' | 'exclusive'>('basic');

  const licenses = [
    { value: 'basic' as const, label: 'Basic Lease', price: beat.price.basic },
    { value: 'premium' as const, label: 'Premium Lease', price: beat.price.premium },
    { value: 'exclusive' as const, label: 'Exclusive Rights', price: beat.price.exclusive },
  ];

  const handleAddToCart = () => {
    addToCart(beat, selectedLicense);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all">
      {/* Beat Artwork */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={beat.artworkUrl}
          alt={beat.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        
        {/* Beat Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link to={`/beats/${beat.id}`} className="group">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
              {beat.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="bg-zinc-800/80 px-2 py-1 rounded">{beat.genre}</span>
            <span>{beat.bpm} BPM</span>
            <span>{beat.key}</span>
          </div>
        </div>
      </div>

      {/* SoundCloud Player */}
      <div className="p-4">
        {beat.soundCloudUrl ? (
          <SoundCloudEmbed 
            url={beat.soundCloudUrl} 
            height={166}
            color="fbbf24" // Amber color to match theme
          />
        ) : (
          <div className="bg-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-500 text-sm">
              SoundCloud player will appear here once you add the track URL
            </p>
          </div>
        )}
      </div>

      {/* License Selection & Purchase */}
      <div className="p-4 pt-0 space-y-3">
        {/* License Dropdown */}
        <div>
          <label htmlFor={`license-${beat.id}`} className="block text-xs text-zinc-400 mb-2">
            Select License
          </label>
          <select
            id={`license-${beat.id}`}
            value={selectedLicense}
            onChange={(e) => setSelectedLicense(e.target.value as 'basic' | 'premium' | 'exclusive')}
            className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {licenses.map((license) => (
              <option key={license.value} value={license.value}>
                {license.label} - ${license.price}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2.5 rounded-lg transition-colors"
          >
            Add to Cart - ${beat.price[selectedLicense]}
          </button>
          <Link
            to={`/beats/${beat.id}`}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center justify-center"
            title="View Details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
