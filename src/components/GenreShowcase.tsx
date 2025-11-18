import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Genre {
  name: string;
  description: string;
  color: string;
  bgGradient: string;
  icon: string;
  count: number;
}

const GENRES: Genre[] = [
  {
    name: 'Trap',
    description: 'Hard-hitting 808s and hi-hats',
    color: 'from-white to-zinc-200',
    bgGradient: 'from-zinc-800/30 to-zinc-900/30',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 45,
  },
  {
    name: 'Lo-Fi',
    description: 'Chill, jazzy, nostalgic vibes',
    color: 'from-zinc-200 to-zinc-400',
    bgGradient: 'from-zinc-800/20 to-zinc-900/20',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 32,
  },
  {
    name: 'R&B',
    description: 'Smooth, soulful, emotional',
    color: 'from-zinc-100 to-zinc-300',
    bgGradient: 'from-zinc-800/25 to-zinc-900/25',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 28,
  },
  {
    name: 'Drill',
    description: 'Dark, aggressive, street energy',
    color: 'from-white to-zinc-300',
    bgGradient: 'from-zinc-800/35 to-zinc-900/35',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 21,
  },
  {
    name: 'Boom Bap',
    description: 'Classic hip-hop breaks',
    color: 'from-zinc-300 to-zinc-500',
    bgGradient: 'from-zinc-800/20 to-zinc-900/20',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 18,
  },
  {
    name: 'Pop',
    description: 'Catchy, melodic, radio-ready',
    color: 'from-zinc-100 to-white',
    bgGradient: 'from-zinc-800/30 to-zinc-900/30',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    count: 25,
  },
];

export const GenreShowcase: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Explore Genres
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From trap to lo-fi, find the perfect sound for your next hit
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GENRES.map((genre, index) => (
            <Link
              key={genre.name}
              to="/beats"
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden border border-zinc-700/50 hover:border-transparent transition-all duration-300">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${genre.color} p-[2px] rounded-2xl`}>
                  <div className="w-full h-full bg-zinc-900 rounded-2xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${genre.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={genre.icon} />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${genre.color} bg-clip-text text-transparent`}>
                        {genre.name}
                      </h3>
                      <span className="text-zinc-500 text-sm font-semibold">
                        {genre.count} beats
                      </span>
                    </div>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                      {genre.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Animated particles */}
                <div
                  className={`absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br ${genre.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                    hoveredIndex === index ? 'animate-pulse' : ''
                  }`}
                ></div>
                <div
                  className={`absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br ${genre.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700 delay-100 ${
                    hoveredIndex === index ? 'animate-pulse' : ''
                  }`}
                ></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/beats"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-white to-zinc-200 text-black font-semibold hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
          >
            View All Beats
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
