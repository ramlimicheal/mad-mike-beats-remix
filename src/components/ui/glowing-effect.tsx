import React, { useRef, useState, useEffect } from 'react';

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });

      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Set opacity based on proximity
      if (distanceFromCenter < proximity) {
        setOpacity(1 - distanceFromCenter / proximity);
      } else {
        setOpacity(inactiveZone);
      }
    };

    const handleMouseLeave = () => {
      setOpacity(inactiveZone);
    };

    const container = containerRef.current?.parentElement;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [disabled, proximity, inactiveZone]);

  if (disabled || !glow) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none">
      <div
        className="absolute rounded-full transition-opacity duration-300"
        style={{
          width: `${spread * 2}px`,
          height: `${spread * 2}px`,
          left: `${position.x - spread}px`,
          top: `${position.y - spread}px`,
          background: `radial-gradient(circle, rgba(168, 85, 247, ${opacity * 0.3}) 0%, transparent 70%)`,
          opacity: opacity,
        }}
      />
    </div>
  );
};
