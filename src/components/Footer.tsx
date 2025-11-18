import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold tracking-wider">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">MM</span>
                <span className="text-zinc-400 font-light ml-2">PRODUCTIONS</span>
              </h2>
            </div>
            <p className="text-sm text-zinc-400">
              Premium beats and instrumentals for artists worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beats" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                  Browse Beats
                </Link>
              </li>
              <li>
                <Link to="/licensing" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mix-mastering" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                  Mix & Mastering
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Mad Mike Productions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
