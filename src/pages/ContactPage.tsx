import React from 'react';
import { ShineBorder } from '../components/ui/shine-border';

const SocialIcon: React.FC<{ href: string; path: string; label: string }> = ({ href, path, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
        <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-colors">
            <svg className="w-5 h-5 text-zinc-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={path} />
            </svg>
        </div>
        <span className="text-zinc-300 group-hover:text-white">{label}</span>
    </a>
);

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight">Get In Touch</h1>
                <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">Have a question, a custom request, or just want to connect? Drop me a line.</p>
            </div>

            <div className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-16 bg-zinc-900 p-8 md:p-12 rounded-lg">
                <ShineBorder />
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                            <input type="text" name="name" id="name" required className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                            <input type="email" name="email" id="email" required className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">Subject</label>
                            <input type="text" name="subject" id="subject" required className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                            <textarea name="message" id="message" rows={5} required className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-white text-black font-bold py-3 px-6 rounded-md hover:bg-zinc-200 transition-colors">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Contact Info & Socials */}
                <div className="space-y-10">
                     <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-4 text-lg">
                           <a href="mailto:contact@madmikeproductions.com" className="flex items-center group">
                                <svg className="w-6 h-6 mr-3 text-zinc-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                               <span className="text-zinc-300 group-hover:text-white">contact@madmikeproductions.com</span>
                           </a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Connect on Social Media</h2>
                        <div className="space-y-6">
                            <SocialIcon href="#" label="Instagram" path="M12,2.163c3.204,0,3.584,0.012,4.85,0.07c3.252,0.148,4.771,1.691,4.919,4.919c0.058,1.265,0.07,1.646,0.07,4.85s-0.012,3.584-0.07,4.85c-0.148,3.227-1.669,4.771-4.919,4.919c-1.266,0.058-1.646,0.07-4.85,0.07s-3.584-0.012-4.85-0.07c-3.252-0.148-4.771-1.691-4.919-4.919c-0.058-1.265-0.07-1.646-0.07-4.85s0.012-3.584,0.07-4.85C2.47,3.93,3.99,2.411,7.15,2.263C8.416,2.175,8.796,2.163,12,2.163 M12,0C8.741,0,8.333,0.014,7.053,0.072C2.695,0.272,0.273,2.69,0.073,7.052C0.014,8.333,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.2,4.358,2.618,6.78,6.98,6.98c1.281,0.058,1.689,0.072,4.949,0.072c3.259,0,3.668-0.014,4.948-0.072c4.354-0.2,6.782-2.618,6.979-6.98c0.058-1.28,0.072-1.689,0.072-4.948c0-3.259-0.014-3.668-0.072-4.948C21.302,2.69,18.879,0.273,14.522,0.073C13.242,0.014,12.833,0,12,0L12,0z M12,5.838c-3.403,0-6.162,2.759-6.162,6.162s2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162S15.403,5.838,12,5.838z M12,16.2c-2.31,0-4.187-1.877-4.187-4.188c0-2.31,1.877-4.188,4.187-4.188s4.187,1.877,4.187,4.188C16.187,14.323,14.31,16.2,12,16.2z M16.965,5.59c-0.66,0-1.194,0.534-1.194,1.194c0,0.66,0.534,1.194,1.194,1.194c0.66,0,1.194-0.534,1.194-1.194C18.159,6.124,17.625,5.59,16.965,5.59z" />
                            <SocialIcon href="#" label="Twitter" path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6.02,17.25 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                            <SocialIcon href="#" label="YouTube" path="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.89 3.42 0 4.284 0 7.742v8.516c0 3.458.89 4.322 4.385 4.558 3.6.245 11.626.246 15.23 0 3.495-.236 4.385-1.099 4.385-4.558V7.742c0-3.458-.89-4.322-4.385-4.558zM8 15.5V8.5l6.5 3.5-6.5 3.5z"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;