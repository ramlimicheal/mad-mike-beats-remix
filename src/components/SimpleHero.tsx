import React from 'react';
import { Link } from 'react-router-dom';
import { BEATS } from '../constants';
import AnimatedBadge from './AnimatedBadge';

interface BeatCardProps {
  beat: {
    id: string | number;
    title: string;
    artist: string;
    artworkUrl: string;
    genre: string;
  };
}

const BeatCard: React.FC<BeatCardProps> = ({ beat }) => {
  return (
    <div className="relative flex items-end h-[200px] w-[200px] border border-zinc-800 rounded-xl mb-6 overflow-hidden group hover:border-white/20 transition-all cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${beat.artworkUrl})`,
        }}
      />
      <div className="relative w-full flex flex-col bg-black/60 backdrop-blur-sm border-t border-zinc-800 rounded-b-xl p-3">
        <p className="text-white text-sm font-medium truncate">
          {beat.title}
        </p>
        <p className="text-zinc-400 text-xs truncate">
          {beat.genre}
        </p>
      </div>
    </div>
  );
};

interface ScrollingColumnProps {
  beats: typeof BEATS;
  animationName: 'scroll-up' | 'scroll-down';
}

const ScrollingColumn: React.FC<ScrollingColumnProps> = ({
  beats,
  animationName,
}) => {
  // Duplicate beats for seamless loop
  const duplicatedBeats = [...beats, ...beats];

  return (
    <div
      className="flex flex-col w-[200px] mr-8"
      style={{
        animation: `${animationName} 20s linear infinite`,
      }}
    >
      {duplicatedBeats.map((beat, index) => (
        <BeatCard key={`${beat.id}-${index}`} beat={beat} />
      ))}
    </div>
  );
};

export const SimpleHero: React.FC = () => {
  // Split beats into three columns
  const column1 = BEATS.slice(0, 2);
  const column2 = BEATS.slice(2, 4);
  const column3 = BEATS.slice(4, 6);

  return (
    <section className="w-full bg-zinc-950 flex items-center justify-center px-4 sm:px-8 py-16 min-h-[85vh]">
      <style>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left side - Content */}
        <div className="flex flex-col w-full max-w-[600px]">
          <div className="mb-6">
            <AnimatedBadge text="MM PRODUCTIONS" color="#f59e0b" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="block bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Premium Beats
            </span>
            <span className="block bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              For Serious Artists
            </span>
          </h1>

          <p className="text-zinc-400 text-sm mb-6 max-w-md">
            Industry-ready production. Instant delivery. Transparent licensing.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
            <Link
              to="/beats"
              className="px-6 py-2.5 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20"
            >
              Browse Beats
            </Link>
            <Link
              to="/licensing"
              className="px-6 py-2.5 text-sm bg-transparent text-white font-medium border border-amber-500/30 rounded-lg hover:border-amber-500 hover:bg-amber-500/10 transition-all"
            >
              View Licensing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div>
              <p className="text-xl font-semibold text-white mb-0.5">500K+</p>
              <p className="text-zinc-500 text-xs">Streams</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-0.5">200+</p>
              <p className="text-zinc-500 text-xs">Artists</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-0.5">1K+</p>
              <p className="text-zinc-500 text-xs">Beats Sold</p>
            </div>
          </div>
        </div>

        {/* Right side - Scrolling beats showcase */}
        <div className="relative flex items-center w-full max-w-[664px] h-[500px] lg:h-[600px] overflow-hidden hidden lg:flex">
          <div className="absolute top-0 w-full h-[100px] bg-gradient-to-b from-zinc-950 to-transparent z-10" />
          <ScrollingColumn beats={column1} animationName="scroll-up" />
          <ScrollingColumn beats={column2} animationName="scroll-down" />
          <ScrollingColumn beats={column3} animationName="scroll-up" />
          <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-zinc-950 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};
