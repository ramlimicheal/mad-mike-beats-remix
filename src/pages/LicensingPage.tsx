import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { LICENSES, FAQ_ITEMS } from '../constants';

const LicensingPage: React.FC = () => {
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
            Choose Your License
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Flexible licensing options to fit your needs, from demos to professional releases.
          </p>
        </motion.div>

        {/* License Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {LICENSES.map((license, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-lg p-8 ${
                license.isDark
                  ? 'bg-zinc-900 border-2 border-zinc-800'
                  : 'bg-zinc-900/50 border border-zinc-800'
              } ${license.isPopular ? 'ring-2 ring-amber-500' : ''}`}
            >
              {license.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{license.title}</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-1">{license.price}</p>
                {license.priceSubtitle && (
                  <p className="text-sm text-zinc-400">{license.priceSubtitle}</p>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-zinc-400 mb-4">Best for: <span className="text-white font-semibold">{license.bestFor}</span></p>
              </div>

              <ul className="space-y-3 mb-8">
                {license.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-lg font-semibold hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LicensingPage;
