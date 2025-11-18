import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Zap, Award } from 'lucide-react';
import { BEATS, TESTIMONIALS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';

const HomePage: React.FC = () => {
  const { playBeat, setPlaylist } = usePlayer();

  const featuredBeats = BEATS.slice(0, 3);

  const handlePlayBeat = (beat: typeof BEATS[0]) => {
    setPlaylist(BEATS);
    playBeat(beat);
  };

  return (
    <div className="animated-grid-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Premium Beats for
            <span className="block text-purple-500">Serious Artists</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            Industry-ready instrumentals crafted for trap, lo-fi, R&B, drill, and more. Instant delivery with flexible licensing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/beats"
              className="px-8 py-4 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Browse Beats
            </Link>
            <Link
              to="/licensing"
              className="px-8 py-4 border border-zinc-700 text-white rounded-lg font-semibold hover:border-purple-500 transition-colors"
            >
              View Licensing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, label: 'Premium Beats', value: '100+' },
              { icon: Award, label: 'Happy Artists', value: '500+' },
              { icon: Zap, label: 'Instant Delivery', value: '24/7' },
              { icon: Play, label: 'Genres', value: '10+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Beats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Beats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBeats.map((beat, i) => (
              <motion.div
                key={beat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
              >
                <img
                  src={beat.artworkUrl}
                  alt={beat.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handlePlayBeat(beat)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
                  >
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{beat.title}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{beat.genre} • {beat.bpm} BPM</p>
                  <Link
                    to={`/beats/${beat.id}`}
                    className="text-purple-500 hover:text-purple-400 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/beats"
              className="inline-block px-8 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              View All Beats
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            What Artists Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-zinc-900 p-6 rounded-lg border border-zinc-800"
              >
                <p className="text-zinc-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
