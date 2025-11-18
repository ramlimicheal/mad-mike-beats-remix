import React from 'react';
import { cn } from '../lib/utils';
import { BentoCard, BentoGrid as BentoGridContainer } from './ui/bento-grid';

// Icon Components
const MusicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HeadphonesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

// Animated Waveform Background
const AnimatedWaveform = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-40">
    <div className="flex gap-2 items-end h-40">
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50"
          style={{
            height: `${30 + Math.random() * 70}%`,
            animation: `pulse ${0.8 + Math.random() * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Floating Icons Animation
const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute text-amber-500/40"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
        }}
      >
        <svg className="w-12 h-12 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
    ))}
  </div>
);

// Genre Tags Marquee
const GenreTags = () => {
  const genres = ['Trap', 'Lo-Fi', 'R&B', 'Drill', 'Boom Bap', 'Hip Hop', 'Afrobeat', 'UK Drill'];
  
  return (
    <div className="absolute bottom-8 left-0 right-0 overflow-hidden opacity-30">
      <div className="flex gap-3 animate-marquee whitespace-nowrap">
        {[...genres, ...genres].map((genre, i) => (
          <span
            key={i}
            className="inline-block px-5 py-2.5 bg-zinc-900/80 border border-amber-500/20 rounded-full text-sm font-medium text-amber-500/80 backdrop-blur-sm shadow-lg"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

// Licensing Checkmarks Animation
const LicensingChecks = () => {
  const features = [
    'WAV + MP3 Files',
    'Instant Download',
    'Track Stems',
    'Commercial Use',
    'Unlimited Streams',
    'Radio Airplay',
  ];
  
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-4 opacity-50">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm text-zinc-300"
            style={{
              animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const features = [
  {
    Icon: MusicIcon,
    name: 'Industry-Ready Production',
    description: 'Every beat is professionally mixed and mastered. Ready for immediate use in your projects.',
    href: '#',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: <AnimatedWaveform />,
  },
  {
    Icon: BoltIcon,
    name: 'Instant Delivery',
    description: 'Download your beats immediately after purchase. No waiting, no delays.',
    className: 'col-span-3 lg:col-span-1',
    background: <FloatingIcons />,
  },
  {
    Icon: HeadphonesIcon,
    name: 'Multiple Genres',
    description: 'From trap to lo-fi, drill to boom bap. Find your perfect sound.',
    className: 'col-span-3 lg:col-span-1',
    background: <GenreTags />,
  },
  {
    Icon: ShieldIcon,
    name: 'Clear Licensing',
    description: 'Transparent terms with no hidden fees. Use your beats with confidence.',
    className: 'col-span-3 lg:col-span-2',
    background: <LicensingChecks />,
  },
];

export const BentoGrid: React.FC = () => {
  return (
    <section className="bg-zinc-950 py-16">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Why Choose Mad Mike Productions
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto">
            Professional beats crafted for serious artists
          </p>
        </div>

        <BentoGridContainer className="lg:grid-rows-3">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGridContainer>
      </div>
    </section>
  );
};
