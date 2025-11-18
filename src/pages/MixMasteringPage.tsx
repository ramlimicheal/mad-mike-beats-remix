import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const MusicIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HeadphonesIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);

const AwardIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MixMasteringPage: React.FC = () => {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

    const portfolioItems = [
        { id: 1, image: '/Beat.png', title: 'Hip Hop Mix' },
        { id: 2, image: '/hero.png', title: 'R&B Master' },
        { id: 3, image: '/Beat.png', title: 'Pop Production' },
        { id: 4, image: '/hero.png', title: 'Trap Mix' },
    ];

    const features = [
        {
            icon: <SettingsIcon />,
            title: 'Address the issues in your music',
            description: 'We analyze and fix problematic frequencies, timing issues, and dynamic imbalances to ensure your track sounds professional.'
        },
        {
            icon: <HeadphonesIcon />,
            title: 'A tailored approach',
            description: 'Every project is unique. We customize our mixing and mastering process to match your artistic vision and genre requirements.'
        },
        {
            icon: <AwardIcon />,
            title: 'Creativity first',
            description: 'Technical excellence meets creative artistry. We enhance your music while preserving the emotion and energy of your performance.'
        }
    ];

    const packages = [
        {
            name: 'Mixing',
            price: '$150',
            period: 'per track',
            turnaround: '3-5 days',
            features: [
                'Professional stereo mix',
                'Vocal tuning & timing',
                'EQ & compression',
                'Effects & automation',
                '2 revisions included',
                'WAV file delivery'
            ]
        },
        {
            name: 'Mastering',
            price: '$75',
            period: 'per track',
            turnaround: '1-2 days',
            features: [
                'Loudness optimization',
                'Frequency balancing',
                'Stereo enhancement',
                'Format conversion',
                '2 revisions included',
                'Multiple formats'
            ]
        },
        {
            name: 'Mix + Master',
            price: '$200',
            period: 'per track',
            turnaround: '5-7 days',
            popular: true,
            features: [
                'Full mixing service',
                'Professional mastering',
                'Streaming ready',
                'Radio quality',
                '3 revisions included',
                'All formats included',
                'Priority support'
            ]
        }
    ];

    const howItWorks = [
        {
            icon: <CheckIcon />,
            title: 'Fast Turnaround',
            description: 'Get your professionally mixed and mastered tracks back quickly without compromising quality.'
        },
        {
            icon: <ClockIcon />,
            title: 'Revisions & Feedback',
            description: 'Multiple revision rounds included to ensure you get exactly the sound you\'re looking for.'
        },
        {
            icon: <AwardIcon />,
            title: 'Highest Quality',
            description: 'Industry-standard tools and techniques used by professionals to deliver radio-ready tracks.'
        }
    ];

    return (
        <div className="bg-zinc-950">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950 z-10" />
                    <img 
                        src="/hero.png" 
                        alt="Mixing Studio" 
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Professional online mixing<br />
                        and mastering services
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto"
                    >
                        Transform your recordings into radio-ready tracks. Expert mixing and mastering at an affordable price.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/30"
                    >
                        Get Started
                    </motion.button>
                </div>
            </section>

            {/* Portfolio Gallery */}
            <section className="py-16 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Work</h2>
                        <p className="text-zinc-400">Projects we've worked on</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {portfolioItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative aspect-square rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500/30 transition-all duration-300"
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white font-semibold">{item.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Your Sound, Our Expertise */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Your sound,<br />our expertise
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            We use state-of-the-art technology to deliver professional mixing and mastering services that bring your music to life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Cards */}
            <section className="py-16 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-amber-500/30 transition-all duration-300"
                            >
                                <div className="text-amber-500 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* State of the Art Technology */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            State of the art<br />technology
                        </h2>
                        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                            We use state of the art technology to achieve a modern studio standard.
                        </p>
                        <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/30">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Platform Compatibility */}
            <section className="py-16 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">Streamlined for all Major Platforms</h3>
                        <p className="text-zinc-400">Your tracks will sound perfect on every streaming service</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        <MusicIcon />
                        <HeadphonesIcon />
                        <SettingsIcon />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">How it works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Process Steps */}
                    <div className="mt-16 space-y-8">
                        <div className="border-l-4 border-amber-500 pl-8 py-4">
                            <h4 className="text-2xl font-bold text-black mb-2">Purchase a package</h4>
                            <p className="text-gray-600">
                                Pick one of the packages below and make the purchase. You will instantly receive the booking form via email.
                            </p>
                        </div>
                        <div className="border-l-4 border-amber-500 pl-8 py-4">
                            <h4 className="text-2xl font-bold text-black mb-2">Send audio files and info</h4>
                            <p className="text-gray-600">
                                Fill out the booking form and provide your audio files and references. We'll review your submission and start working.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Packages */}
            <section className="py-20 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Choose Your Package</h2>
                        <p className="text-zinc-400">Professional services at competitive prices</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative bg-zinc-900 border ${pkg.popular ? 'border-amber-500' : 'border-zinc-800'} rounded-lg p-8 hover:border-amber-500/50 transition-all duration-300`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold px-4 py-1 rounded-full">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                                    <span className="text-zinc-400 ml-2">{pkg.period}</span>
                                </div>
                                <p className="text-sm text-zinc-500 mb-6">Turnaround: {pkg.turnaround}</p>
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                                            <span className="text-amber-500 mt-0.5"><CheckIcon /></span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => setSelectedPackage(pkg.name)}
                                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                                        pkg.popular 
                                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/30'
                                            : 'bg-white text-black hover:bg-zinc-200'
                                    }`}
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to elevate your sound?
                    </h2>
                    <p className="text-zinc-400 mb-8">
                        Get professional mixing and mastering services that will take your music to the next level
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/30">
                        Contact Us Today
                    </button>
                </div>
            </section>
        </div>
    );
};

export default MixMasteringPage;
