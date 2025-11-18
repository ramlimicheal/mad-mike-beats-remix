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
              <Music2 className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold text-white">Mad Mike</span>
            </div>
            <p className="text-sm text-zinc-400">
              Premium beats and instrumentals for artists worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/beats" className="text-sm text-zinc-400 hover:text-purple-500">
                  Browse Beats
                </Link>
              </li>
              <li>
                <Link to="/licensing" className="text-sm text-zinc-400 hover:text-purple-500">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-zinc-400 hover:text-purple-500">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mix-mastering" className="text-sm text-zinc-400 hover:text-purple-500">
                  Mix & Mastering
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-zinc-400 hover:text-purple-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-purple-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-purple-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-purple-500">
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
