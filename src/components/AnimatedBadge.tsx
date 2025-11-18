import React from 'react';

interface AnimatedBadgeProps {
  text?: string;
  color?: string;
  href?: string;
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text = "MM PRODUCTIONS",
  color = "#f59e0b",
  href
}) => {
  const badge = (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 hover:scale-105"
      style={{
        borderColor: color,
        color: color,
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: color }}
        ></span>
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: color }}
        ></span>
      </span>
      <span className="font-semibold tracking-wide">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {badge}
      </a>
    );
  }

  return badge;
};

export default AnimatedBadge;
