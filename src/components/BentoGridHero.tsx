import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../contexts/PlayerContext';
import { BEATS } from '../constants';
import { BorderBeam } from './ui/border-beam';
import { MagneticButton } from './ui/magnetic-button';

export const BentoGridHero: React.FC = () => {
  const { playBeat, isPlaying, currentBeat } = usePlayer();
  const [streamCount, setStreamCount] = useState(487253);
  const featuredBeat = BEATS[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setStreamCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayFeatured = () => {
    playBeat(featuredBeat, BEATS);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-zinc-950"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(120px,auto)]">

          {/* Hero Title - Spans full width */}
          <div className="md:col-span-12 md:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 p-8 md:p-12 border border-zinc-700/50 backdrop-blur-sm">
            <BorderBeam size={300} duration={12} delay={0} />

            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <span className="text-zinc-300 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  TRENDING NOW
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none">
                <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-300 bg-clip-text text-transparent">
                  SOUNDS THAT
                </span>
                <span className="block bg-gradient-to-r from-zinc-100 via-white to-zinc-100 bg-clip-text text-transparent animate-gradient-x">
                  INSPIRE
                </span>
              </h1>

              <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-2xl">
                Premium beats crafted for artists who demand excellence. Industry-ready production, instant delivery.
              </p>

              <div className="flex flex-wrap gap-4">
                <MagneticButton className="bg-gradient-to-r from-white to-zinc-200 text-black font-bold px-8 py-4 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
                  <Link to="/beats" className="flex items-center gap-2">
                    Browse Beats
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </MagneticButton>

                <button className="px-8 py-4 rounded-full border-2 border-zinc-700 text-white font-semibold hover:border-white hover:bg-white/5 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <style>{`
              @keyframes gradient-x {
                0%, 100% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
              }
              .animate-gradient-x {
                background-size: 200% auto;
                animation: gradient-x 3s ease infinite;
              }
            `}</style>
          </div>

          {/* Featured Beat Player */}
          <div className="md:col-span-5 md:row-span-3 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 group hover:border-white/30 transition-all duration-300">
            <BorderBeam size={250} duration={10} delay={2} />

            <div className="relative h-full p-6">
              <div className="mb-4">
                <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Featured Beat</p>
                <h3 className="text-2xl font-bold text-white mt-1">{featuredBeat.title}</h3>
                <p className="text-zinc-400 text-sm">{featuredBeat.genre} • {featuredBeat.bpm} BPM • {featuredBeat.key}</p>
              </div>

              {/* Artwork with play button */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 group">
                <img
                  src={featuredBeat.artworkUrl}
                  alt={featuredBeat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Play button */}
                <button
                  onClick={handlePlayFeatured}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                >
                  {isPlaying && currentBeat?.id === featuredBeat.id ? (
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Waveform visualization placeholder */}
              <div className="flex items-end justify-between h-16 gap-1">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${
                      isPlaying && currentBeat?.id === featuredBeat.id
                        ? 'bg-gradient-to-t from-white to-zinc-400 animate-wave'
                        : 'bg-zinc-700'
                    }`}
                    style={{
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <style>{`
              @keyframes wave {
                0%, 100% {
                  transform: scaleY(1);
                }
                50% {
                  transform: scaleY(0.5);
                }
              }
              .animate-wave {
                animation: wave 0.8s ease-in-out infinite;
              }
            `}</style>
          </div>

          {/* Live Stats */}
          <div className="md:col-span-4 md:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 border border-zinc-700/50 hover:border-white/30 transition-all duration-300">
            <BorderBeam size={200} duration={15} delay={1} />

            <div className="relative z-10">
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-4">Live Stats</p>

              <div className="space-y-4">
                <div>
                  <p className="text-5xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    {streamCount.toLocaleString()}
                  </p>
                  <p className="text-zinc-400 text-sm mt-1">Total Streams</p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white">200+</p>
                    <p className="text-zinc-400 text-xs">Artists</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">1K+</p>
                    <p className="text-zinc-400 text-xs">Beats Sold</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

          {/* Artist Quote */}
          <div className="md:col-span-3 md:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 border border-zinc-700/50">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <svg className="w-8 h-8 text-zinc-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="text-white text-lg font-medium italic mb-4">
                  "The production quality is top-notch. Exactly what Indian hip-hop needs."
                </p>
              </div>
              <div>
                <p className="text-zinc-200 font-semibold">Raftaar</p>
                <p className="text-zinc-400 text-sm">Hip-Hop Artist, Mumbai</p>
              </div>
            </div>
          </div>

          {/* Genre Pills */}
          <div className="md:col-span-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 border border-zinc-700/50">
            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-4">Explore Genres</p>

            <div className="flex flex-wrap gap-2">
              {['Trap', 'Lo-Fi', 'R&B', 'Drill', 'Boom Bap', 'Pop'].map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm font-medium border border-zinc-700 hover:border-white hover:bg-white/5 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Action */}
          <div className="md:col-span-3 relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 border border-zinc-700/50 flex items-center justify-center group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-white font-semibold">New Drop</p>
              <p className="text-zinc-400 text-sm">Every Friday</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};
