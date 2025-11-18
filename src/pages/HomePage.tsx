import React from 'react';
import { Link } from 'react-router-dom';
import { BEATS } from '../constants';
import AnimatedBadge from '../components/AnimatedBadge';

interface BeatCardProps {
  beat: {
    id: number;
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

const HomePage: React.FC = () => {
  const column1 = BEATS.slice(0, 2);
  const column2 = BEATS.slice(2, 4);
  const column3 = BEATS.slice(4, 6);

  return (
    <div className="min-h-screen bg-zinc-950">
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

      {/* Hero Section */}
      <section className="w-full bg-zinc-950 flex items-center justify-center px-4 sm:px-8 py-12 min-h-[90vh]">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side - Content */}
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="mb-4">
              <AnimatedBadge text="MM PRODUCTIONS" color="#f59e0b" />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
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

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/beats"
                className="px-6 py-2.5 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-black font-medium rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Browse Beats
              </Link>
              <Link
                to="/licensing"
                className="px-6 py-2.5 text-sm bg-transparent text-white font-medium border border-zinc-700 rounded-lg hover:border-amber-500 hover:bg-amber-500/5 transition-all"
              >
                View Licensing
              </Link>
            </div>
          </div>

          {/* Right side - Scrolling Beat Cards (Hidden on mobile) */}
          <div className="hidden lg:flex flex-row items-start justify-center gap-0 h-[500px] overflow-hidden w-1/2">
            <ScrollingColumn beats={column1} animationName="scroll-up" />
            <ScrollingColumn beats={column2} animationName="scroll-down" />
            <ScrollingColumn beats={column3} animationName="scroll-up" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
