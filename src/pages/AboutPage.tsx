import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Award, Target, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Mad Mike Productions
          </h1>
          <p className="text-xl text-zinc-400">
            Crafting premium beats for artists worldwide since 2015
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 rounded-lg p-8 mb-12 border border-zinc-800"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Mad Mike Productions started with a simple mission: to provide high-quality, 
              industry-ready beats that empower artists to create their best work. What began 
              as a passion project in a bedroom studio has grown into a full-fledged production 
              house serving artists across the globe.
            </p>
            <p>
              With over 8 years of experience in music production, we've worked with hundreds 
              of artists, from emerging talents to established names in the industry. Our beats 
              have been featured on streaming platforms worldwide, accumulating millions of plays 
              and helping artists achieve their musical dreams.
            </p>
            <p>
              We specialize in multiple genres including trap, lo-fi, R&B, drill, and boom bap, 
              ensuring that every artist can find the perfect sound for their vision. Each beat 
              is crafted with attention to detail, using professional-grade equipment and mixing 
              techniques to ensure the highest quality.
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: Music2,
              title: 'Quality First',
              description: 'Every beat is produced to industry standards with professional mixing and mastering.',
            },
            {
              icon: Zap,
              title: 'Instant Delivery',
              description: 'Get your beats immediately after purchase. No waiting, no hassle.',
            },
            {
              icon: Target,
              title: 'Artist-Focused',
              description: 'Flexible licensing options designed to support artists at every stage of their career.',
            },
            {
              icon: Award,
              title: 'Proven Results',
              description: 'Our beats have helped artists achieve millions of streams and chart success.',
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
            >
              <value.icon className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-zinc-400">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-zinc-900 rounded-lg p-8 border border-zinc-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Happy Artists' },
              { value: '100+', label: 'Premium Beats' },
              { value: '10M+', label: 'Total Streams' },
              { value: '8+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-purple-500 mb-2">{stat.value}</p>
                <p className="text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
