import React from 'react';

export const ShineBorder: React.FC = () => {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
      <div className="absolute inset-0 border border-amber-500/20 rounded-lg" />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
          animation: 'shine 2s infinite',
        }}
      />
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
