import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Sparkles, Zap, Check } from 'lucide-react';

const MixMasteringPage: React.FC = () => {
  const packages = [
    {
      name: 'Mix Only',
      price: '$150',
      features: [
        'Professional mixing',
        'Up to 50 tracks',
        'Vocal tuning included',
        '2 revisions',
        '48-hour delivery',
      ],
    },
    {
      name: 'Mix & Master',
      price: '$250',
      features: [
        'Professional mixing',
        'Mastering for all platforms',
        'Up to 50 tracks',
        'Vocal tuning & effects',
        '3 revisions',
        '72-hour delivery',
        'Stems included',
      ],
      popular: true,
    },
    {
      name: 'Full Production',
      price: '$500',
      features: [
        'Beat production',
        'Professional mixing',
        'Mastering for all platforms',
        'Unlimited tracks',
        'Vocal production',
        'Unlimited revisions',
        '1-week delivery',
        'All stems & files',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mix & Mastering Services
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Professional mixing and mastering to make your tracks radio-ready and streaming-optimized.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Headphones,
              title: 'Industry Standard',
              description: 'Studio-quality mixing using professional-grade equipment and plugins.',
            },
            {
              icon: Sparkles,
              title: 'Expert Engineers',
              description: 'Experienced audio engineers with years of industry experience.',
            },
            {
              icon: Zap,
              title: 'Fast Turnaround',
              description: 'Quick delivery without compromising on quality.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <feature.icon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-lg p-8 ${
                pkg.popular
                  ? 'bg-zinc-900 ring-2 ring-purple-500'
                  : 'bg-zinc-900/50 border border-zinc-800'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-purple-500">{pkg.price}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 rounded-lg p-8 border border-zinc-800"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Send Your Files', desc: 'Upload your tracks via WeTransfer or Google Drive' },
              { step: '2', title: 'Review & Quote', desc: 'We review your project and provide a detailed quote' },
              { step: '3', title: 'Production', desc: 'Our engineers work their magic on your tracks' },
              { step: '4', title: 'Delivery', desc: 'Receive your polished, radio-ready tracks' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MixMasteringPage;
