import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

const GradientOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow-delayed" />
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string; delay: string }> = ({
  value,
  label,
  delay,
}) => {
  return (
    <div
      className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="text-xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
        {value}
      </p>
      <p className="text-zinc-500 text-xs">{label}</p>
    </div>
  );
};

export const EnhancedHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full bg-zinc-950 overflow-hidden">
      <FloatingParticles />
      <GradientOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-500 text-sm font-semibold">TRENDING NOW</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                Premium Beats
              </span>
              <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                For Serious Artists
              </span>
            </h1>

            <p className="text-zinc-400 text-base max-w-xl">
              Industry-ready production. Instant delivery. Transparent licensing. 
              Elevate your sound with professionally crafted beats.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/beats"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 group"
              >
                <span>Browse Beats</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/licensing"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-semibold border-2 border-zinc-700 rounded-lg hover:border-amber-500 hover:bg-amber-500/5 transition-all"
              >
                View Licensing
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800">
              <StatCard value="500+" label="Premium Beats" delay="0s" />
              <StatCard value="10K+" label="Happy Artists" delay="0.1s" />
              <StatCard value="50M+" label="Streams" delay="0.2s" />
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg)`,
            }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/hero.png"
                alt="Music Production Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
