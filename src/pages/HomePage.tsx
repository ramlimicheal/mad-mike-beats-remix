import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBeats } from '../hooks/useBeats';
import { usePlayer } from '../contexts/PlayerContext';
import { EnhancedHero } from '../components/EnhancedHero';
import { FeaturedBeats } from '../components/FeaturedBeats';
import { BentoGrid } from '../components/BentoGrid';
import { LogoCloud } from '../components/LogoCloud';
import { PricingSection } from '../components/PricingSection';

const HomePage: React.FC = () => {
    const { setPlaylist } = usePlayer();
    const { data: beats, isLoading } = useBeats();

    useEffect(() => {
        if (beats) {
            setPlaylist(beats);
        }
    }, [beats, setPlaylist]);

    return (
        <div>
            {/* Enhanced Hero with Animations */}
            <EnhancedHero />

            {/* Featured Beats with SoundCloud Players */}
            <FeaturedBeats />

            {/* Bento Grid */}
            <BentoGrid />

            {/* Pricing Section */}
            <PricingSection />

            {/* Logo Cloud */}
            <LogoCloud />

            {/* Simple CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    Start Creating Today
                </h2>
                <p className="text-zinc-400 text-base mb-8 max-w-2xl mx-auto">
                    Browse our complete catalog and find your perfect sound.
                </p>
                <Link
                    to="/beats"
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-sm px-8 py-3.5 rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                >
                    Explore All Beats
                </Link>
            </section>
        </div>
    );
};

export default HomePage;