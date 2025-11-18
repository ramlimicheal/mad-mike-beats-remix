import React from 'react';
import { BEATS } from '../constants';

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
        animation: `${animationName} 60s linear infinite`,
      }}
    >
      {duplicatedBeats.map((beat, index) => (
        <BeatCard key={`${beat.id}-${index}`} beat={beat} />
      ))}
    </div>
  );
};

export const BeatsShowcase: React.FC = () => {
  // Split beats into three columns
  const column1 = BEATS.slice(0, 2);
  const column2 = BEATS.slice(2, 4);
  const column3 = BEATS.slice(4, 6);

  return (
    <section className="w-full bg-zinc-950 flex items-center px-4 sm:px-8 py-20">
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

      <div className="flex flex-col w-full max-w-[600px] pr-8">
        <p className="text-zinc-500 text-sm uppercase tracking-wider font-semibold mb-4">
          Premium Beats
        </p>
        <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Industry-Ready Production
        </h2>
        <p className="text-zinc-400 text-lg mb-8 max-w-md">
          Thousands of artists trust our beats. Find your perfect sound and elevate your music.
        </p>
        <a
          href="#/beats"
          className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 text-white hover:bg-white/10 transition-all w-fit group"
        >
          <span className="font-medium">Explore All Beats</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>

      <div className="relative flex items-center w-full max-w-[664px] max-h-[600px] overflow-hidden">
        <div className="absolute top-0 w-full h-[100px] bg-gradient-to-b from-zinc-950 to-transparent z-10" />
        <ScrollingColumn beats={column1} animationName="scroll-up" />
        <ScrollingColumn beats={column2} animationName="scroll-down" />
        <ScrollingColumn beats={column3} animationName="scroll-up" />
        <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-zinc-950 to-transparent z-10" />
      </div>
    </section>
  );
};
