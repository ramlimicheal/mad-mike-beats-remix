import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BEATS } from '../constants';
import AnimatedGridBackground from '../components/AnimatedGridBackground';
import AnimatedBadge from '../components/AnimatedBadge';
import { StatsCounter } from '../components/StatsCounter';
import { BeatsShowcase } from '../components/BeatsShowcase';
import { LogoCloud } from '../components/LogoCloud';
import { FeaturesGrid } from '../components/FeaturesGrid';
import BeatCard from '../components/BeatCard';

const HomePage: React.FC = () => {
  const featuredBeats = BEATS.slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGridBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedBadge text="MM PRODUCTIONS" color="#a855f7" />
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 mt-8 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Premium Beats<br />For Your Next Hit
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto">
              Elevate your sound with industry-ready beats crafted by award-winning producers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/beats">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-purple-400 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
                  Browse Beats
                </button>
              </Link>
              <Link to="/licensing">
                <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all font-semibold">
                  View Licensing
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Beats Showcase */}
      <BeatsShowcase />

      {/* Features Grid */}
      <section className="w-full bg-zinc-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Industry-leading quality and service for artists worldwide
            </p>
          </div>
          <FeaturesGrid />
        </div>
      </section>

      {/* Featured Beats */}
      <section className="w-full bg-zinc-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Featured Beats
            </h2>
            <p className="text-zinc-400 text-lg">Handpicked beats from our latest collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} playlist={featuredBeats} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/beats">
              <button className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all font-semibold">
                View All Beats
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
