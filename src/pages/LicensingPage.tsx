import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { FaqItem } from '../types';
import { ShineBorder } from '../components/ui/shine-border';
import { PricingSection } from '../components/PricingSection';

const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-800">
            <h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-between items-center w-full py-4 text-left text-sm font-medium"
                    aria-expanded={isOpen}
                >
                    <span className="text-zinc-100">{item.question}</span>
                    <svg className={`w-4 h-4 transform transition-transform text-zinc-400 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </h2>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pb-4 pr-8">
                        <p className="text-zinc-400 text-xs">{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const LicensingPage: React.FC = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Licensing Information</h1>
                    <p className="mt-3 text-sm text-zinc-400 max-w-3xl mx-auto">Understand your rights and choose the perfect license for your needs.</p>
                </div>
            </div>

            {/* Pricing Section */}
            <PricingSection />

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-0">
                        {FAQ_ITEMS.map((item, index) => (
                            <FaqAccordionItem key={index} item={item} />
                        ))}
                    </div>
                </div>
                 <div>
                    <h2 className="text-xl font-semibold mb-6">Custom Inquiries</h2>
                    <div className="relative overflow-hidden bg-zinc-900 p-6 rounded-lg">
                        <ShineBorder />
                        <p className="text-zinc-400 text-xs mb-5">Have questions about exclusive rights, custom beats, or something else? Get in touch.</p>
                        <form className="space-y-3">
                             <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" name="name" id="name" placeholder="Your Name" className="w-full h-9 px-3 text-sm rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input type="email" name="email" id="email" placeholder="Your Email" className="w-full h-9 px-3 text-sm rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea name="message" id="message" rows={4} placeholder="Your Message" className="w-full px-3 py-2 text-sm rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-white text-black font-semibold text-sm py-2.5 rounded-md hover:bg-zinc-200 transition-colors">Send Message</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LicensingPage;