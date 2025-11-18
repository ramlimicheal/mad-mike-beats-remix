import React from 'react';

const BRANDS = [
  { name: 'Spotify', icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.6-.8 6.7-.4 9.2 1 .3.2.4.6.3.9zm1.1-2.8c-.3.4-.7.5-1.1.3-2.5-1.5-6.3-2-9.3-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.4-1 7.6-.5 10.5 1.2.3.2.4.7.3 1zm.1-2.7c-3-1.8-8-2-10.8-1.1-.4.1-1-.1-1.1-.6-.1-.4.1-1 .6-1.1 3.2-1 8.8-.8 12.2 1.3.4.2.5.8.3 1.2-.2.4-.8.5-1.2.3z' },
  { name: 'Apple Music', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5c-.3.3-.8.3-1.1 0l-3.4-3.4-3.4 3.4c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1l3.4-3.4-3.4-3.4c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.4 3.4 3.4-3.4c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1L13.1 12l3.4 3.4c.3.3.3.8 0 1.1z' },
  { name: 'SoundCloud', icon: 'M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-1.713-1.304-3.106-2.911-3.106-.384 0-.751.09-1.092.236-.087-.035-.179-.059-.118-.045zm-10.879.869c.308-.231.639-.429 1-.566v8.634h-1v-8.068z' },
  { name: 'YouTube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
  { name: 'Tidal', icon: 'M12 2L8.5 6 12 10l3.5-4L12 2zm-3.5 8L5 14l3.5 4L12 14 8.5 10zm7 0L12 14l3.5 4L19 14l-3.5-4z' },
  { name: 'Beatport', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
];

export const LogoCloud: React.FC = () => {
  // Duplicate for seamless loop
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden bg-zinc-900/50 py-16">
      <div className="mb-8 text-center">
        <p className="text-zinc-400 text-sm uppercase tracking-wider font-semibold">As Featured On</p>
      </div>

      <div className="relative">
        <div className="flex animate-logo-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[200px] mx-8 flex items-center justify-center"
            >
              <div className="group cursor-pointer">
                <svg
                  className="w-24 h-24 fill-zinc-600 group-hover:fill-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  viewBox="0 0 24 24"
                >
                  <path d={brand.icon} />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-900/50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-900/50 to-transparent pointer-events-none z-10"></div>
      </div>

      <style>{`
        @keyframes logo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-logo-scroll {
          animation: logo-scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
