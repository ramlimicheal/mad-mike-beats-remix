import React from 'react';
import { ShineBorder } from '../components/ui/shine-border';

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight">About Mad Mike Productions</h1>
                <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">The mind behind the music.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-2">
                    <img src="https://picsum.photos/seed/madmike/600/800" alt="Mad Mike" className="rounded-lg object-cover w-full h-full"/>
                </div>
                <div className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-4 text-zinc-100">My Philosophy</h2>
                    <p className="text-zinc-300 text-lg mb-6 leading-relaxed">
                        Music is more than just a collection of sounds; it's a feeling, a story, a moment captured in time. My goal as a producer is to create soundscapes that not only sound good but also feel right. I believe every artist has a unique story to tell, and my role is to provide the perfect sonic canvas for that story to unfold.
                    </p>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                        With over a decade of experience in music production, I've honed my craft across various genres, from the hard-hitting drums of trap to the soulful melodies of R&B. Each beat is meticulously crafted with a focus on quality, emotion, and originality.
                    </p>
                </div>
            </div>
            
            <div className="relative overflow-hidden mt-24 bg-zinc-950 p-12 rounded-lg">
                <ShineBorder />
                <h2 className="text-3xl font-bold text-center mb-10">The Process & Studio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-zinc-100">Behind the Scenes</h3>
                        <p className="text-zinc-300 leading-relaxed mb-4">
                            My creative process always starts with an idea—a simple melody, a drum pattern, or even a mood. From there, I build layers, experimenting with textures and sounds until the track comes alive. I use a combination of analog gear and cutting-edge digital tools to achieve a sound that is both timeless and modern.
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                            My studio is my sanctuary, equipped with industry-standard hardware and software to ensure every beat meets the highest quality standards. From classic synthesizers to the latest VSTs, I have a vast arsenal of tools to bring any musical vision to life.
                        </p>
                    </div>
                    <img src="https://picsum.photos/seed/studio/800/600" alt="Studio" className="rounded-lg"/>
                </div>
            </div>

            <div className="mt-24 text-center">
                 <h2 className="text-3xl font-bold text-center mb-10">Achievements & Collaborations</h2>
                 <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                    I've had the privilege of working with a diverse range of talented artists, both independent and signed. My productions have been featured on streaming platforms, radio, and television, accumulating millions of streams worldwide. I'm grateful for every collaboration and excited for what the future holds.
                 </p>
            </div>

        </div>
    );
};

export default AboutPage;