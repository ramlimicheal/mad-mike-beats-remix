import React, { useState } from 'react';
import { LICENSES } from '../constants';

export const PricingSection: React.FC = () => {
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

    const toggleFlip = (title: string) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(title)) {
                newSet.delete(title);
            } else {
                newSet.add(title);
            }
            return newSet;
        });
    };

    return (
        <section className="bg-zinc-950 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        Choose Your License
                    </h2>
                    <p className="text-zinc-400 text-base max-w-2xl mx-auto">
                        Simple, transparent pricing. Choose the license that fits your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {LICENSES.map((license) => {
                        const isFlipped = flippedCards.has(license.title);

                        return (
                            <div
                                key={license.title}
                                className="relative h-[520px]"
                                style={{ perspective: '1000px' }}
                            >
                                <div
                                    className={`relative w-full h-full transition-transform duration-700 ${
                                        isFlipped ? '[transform:rotateY(180deg)]' : ''
                                    }`}
                                    style={{
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Front of card */}
                                    <div
                                        className={`absolute w-full h-full rounded-2xl p-5 flex flex-col border ${
                                            license.isPopular
                                                ? 'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-amber-500/30 shadow-xl shadow-amber-500/10'
                                                : 'bg-black border-zinc-800/50'
                                        } hover:border-amber-500/30 transition-all duration-500`}
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden'
                                        }}
                                    >
                                        {/* Popular Badge */}
                                        {license.isPopular && (
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                    POPULAR
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-lg font-bold mb-4 text-white">
                                            {license.title}
                                        </h3>

                                        {/* Price */}
                                        <div className="mb-1">
                                            <span className="text-4xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                                                {license.price}
                                            </span>
                                        </div>
                                        <p className="text-xs mb-5 text-zinc-400">
                                            {license.priceSubtitle}
                                        </p>

                                        {/* Features List */}
                                        <ul className="space-y-2.5 mb-5 flex-grow">
                                            {license.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2.5 text-xs">
                                                    {feature.included ? (
                                                        <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                    <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600 line-through'}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Why Pick Button */}
                                        <button
                                            onClick={() => toggleFlip(license.title)}
                                            className="w-full py-2 rounded-lg border border-zinc-700/50 mb-2.5 flex items-center justify-center gap-2 transition-all text-zinc-400 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01"/>
                                            </svg>
                                            <span className="text-xs font-medium">Why pick this license?</span>
                                        </button>

                                        {/* License Agreement Button */}
                                        <button
                                            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                                license.isPopular
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20'
                                                    : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                                            }`}
                                        >
                                            License Agreement
                                        </button>
                                    </div>

                                    {/* Back of card */}
                                    {license.detailedInfo && (
                                        <div
                                            className="absolute w-full h-full rounded-2xl p-6 flex flex-col bg-black border border-zinc-800/50"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            {/* Title */}
                                            <h3 className="text-lg font-bold mb-4 text-white">
                                                {license.title}
                                            </h3>

                                            {/* Who this is for */}
                                            <h4 className="text-sm font-semibold mb-2 text-amber-500">
                                                Who this is for
                                            </h4>
                                            <p className="text-xs mb-4 text-zinc-300 leading-relaxed">
                                                {license.detailedInfo.whoThisIsFor}
                                            </p>

                                            {/* Description */}
                                            <div className="flex-grow">
                                                {license.detailedInfo.description.map((desc, index) => (
                                                    <p key={index} className="text-xs mb-3 text-zinc-400 leading-relaxed">
                                                        {desc}
                                                    </p>
                                                ))}
                                            </div>

                                            {/* Go Back Button */}
                                            <button
                                                onClick={() => toggleFlip(license.title)}
                                                className="w-full py-3 rounded-lg text-sm font-semibold transition-all mt-4 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                                            >
                                                Go back
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
