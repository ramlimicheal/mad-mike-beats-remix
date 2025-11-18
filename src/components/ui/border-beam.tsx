import React from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 200,
  duration = 15,
  delay = 0,
  colorFrom = 'rgba(251, 191, 36, 0.5)',
  colorTo = 'rgba(251, 191, 36, 0)',
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
      <div
        className="absolute inset-[-2px] rounded-3xl"
        style={{
          background: `conic-gradient(from 0deg, ${colorTo}, ${colorFrom}, ${colorTo})`,
          animation: `border-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      <div className="absolute inset-[2px] rounded-3xl bg-zinc-950" />
      <style>{`
        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
