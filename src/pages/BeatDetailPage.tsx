import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BEATS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';
import { useCart } from '../contexts/CartContext';
import BeatCard from '../components/BeatCard';
import { ShineBorder } from '../components/ui/shine-border';
import { SoundCloudEmbed } from '../components/SoundCloudEmbed';

const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>;
const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg>;

const BeatDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const beat = useMemo(() => BEATS.find(b => b.id === Number(id)), [id]);
    const { playBeat, currentBeat, isPlaying } = usePlayer();
    const { addToCart } = useCart();
    
    const relatedBeats = useMemo(() => {
      if (!beat) return [];
      return BEATS.filter(b => b.genre === beat.genre && b.id !== beat.id).slice(0, 4);
    }, [beat]);

    if (!beat) {
        return <div className="text-center py-20 text-2xl">Beat not found.</div>;
    }

    const isCurrentlyPlaying = currentBeat?.id === beat.id && isPlaying;

    const handlePlayClick = () => {
        playBeat(beat, BEATS);
    }
    
    const licenses = [
      { name: 'Basic Lease', type: 'basic' as const, price: beat.price.basic, features: ['MP3 file', 'Sell 2,000 units'] },
      { name: 'Premium Lease', type: 'premium' as const, price: beat.price.premium, features: ['MP3 & WAV files', 'Sell 10,000 units'] },
      { name: 'Exclusive Rights', type: 'exclusive' as const, price: beat.price.exclusive, features: ['All files + Stems', 'Unlimited sales', 'Beat removed from store'] },
    ];

    const handleAddToCart = (licenseType: 'basic' | 'premium' | 'exclusive') => {
        addToCart(beat, licenseType);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Artwork & Info */}
                <div className="lg:col-span-1">
                    <img src={beat.artworkUrl} alt={beat.title} className="w-full rounded-lg shadow-lg mb-6" />
                    
                    {/* SoundCloud Player */}
                    {beat.soundCloudUrl ? (
                        <div className="mb-6">
                            <SoundCloudEmbed 
                                url={beat.soundCloudUrl} 
                                height={166}
                                color="fbbf24"
                            />
                        </div>
                    ) : (
                        <button 
                            onClick={handlePlayClick}
                            className="w-full flex items-center justify-center bg-white text-black font-bold px-8 py-3 rounded-md hover:bg-zinc-200 transition-colors mb-6"
                        >
                            {isCurrentlyPlaying ? <PauseIcon /> : <PlayIcon />}
                            {isCurrentlyPlaying ? 'Pause' : 'Play'}
                        </button>
                    )}
                    <div className="relative overflow-hidden mt-8 bg-zinc-900 p-6 rounded-lg">
                        <ShineBorder />
                        <h3 className="text-xl font-bold mb-4 text-zinc-100">Beat Info</h3>
                        <div className="space-y-3 text-zinc-400">
                            <div className="flex justify-between"><span>Genre:</span> <span className="font-semibold text-white">{beat.genre}</span></div>
                            <div className="flex justify-between"><span>Mood:</span> <span className="font-semibold text-white">{beat.mood}</span></div>
                            <div className="flex justify-between"><span>BPM:</span> <span className="font-semibold text-white">{beat.bpm}</span></div>
                            <div className="flex justify-between"><span>Key:</span> <span className="font-semibold text-white">{beat.key}</span></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Title, Licenses */}
                <div className="lg:col-span-2">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-zinc-100">{beat.title}</h1>
                    <p className="text-xl text-zinc-400 mb-8">Produced by {beat.artist}</p>
                    
                    <h2 className="text-3xl font-bold border-b border-zinc-800 pb-4 mb-6 text-zinc-100">Licensing Options</h2>
                    <div className="space-y-6">
                        {licenses.map(license => (
                            <div key={license.name} className="relative overflow-hidden bg-zinc-900 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between transition-colors">
                                <ShineBorder />
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-100">{license.name}</h3>
                                    <ul className="text-zinc-400 list-disc list-inside mt-2 text-sm">
                                        {license.features.map(f => <li key={f}>{f}</li>)}
                                    </ul>
                                </div>
                                <div className="mt-4 md:mt-0 text-center md:text-right">
                                    <p className="text-2xl font-bold text-zinc-100">${license.price}</p>
                                    <button
                                        onClick={() => handleAddToCart(license.type)}
                                        className="mt-2 bg-zinc-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-zinc-700 transition-colors text-sm"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                     <p className="text-center mt-6 text-zinc-400 text-sm">Need more options? <Link to="/licensing" className="text-zinc-300 hover:underline">View Full Licensing Details</Link></p>
                </div>
            </div>

            {/* Related Beats */}
            {relatedBeats.length > 0 && (
                 <div className="mt-24">
                    <h2 className="text-3xl font-bold mb-8">Related Beats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedBeats.map(rb => <BeatCard key={rb.id} beat={rb} playlist={BEATS}/>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeatDetailPage;