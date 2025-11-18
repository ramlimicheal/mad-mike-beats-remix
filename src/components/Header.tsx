import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/beats', label: 'Beats' },
    { to: '/licensing', label: 'Licensing' },
    { to: '/mix-mastering', label: 'Mix & Mastering' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-purple-500">
            Mad Mike Productions
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-purple-500"
              >
                {link.label}
              </Link>
            ))}
            <button className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-zinc-300" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-zinc-300" />
            ) : (
              <Menu className="h-6 w-6 text-zinc-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-zinc-800 py-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 text-sm font-medium text-zinc-300 hover:text-purple-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
