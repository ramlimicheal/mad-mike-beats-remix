import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { itemCount } = useCart();

    const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors";
    const activeNavLinkClasses = "text-amber-500";

    const NavLinks = ({ onClick }: { onClick?: () => void }) => (
        <>
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>Home</NavLink>
            <NavLink to="/beats" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>Beats</NavLink>
            <NavLink to="/licensing" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>Licensing</NavLink>
            <NavLink to="/mix-mastering" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>Mix & Master</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={onClick}>Contact</NavLink>
        </>
    );

    return (
        <>
            <header className="bg-zinc-950/70 backdrop-blur-sm sticky top-0 z-50 border-b border-zinc-800">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold tracking-wider">
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">MM</span>
                                    <span className="text-zinc-400 font-light ml-2">PRODUCTIONS</span>
                                </h1>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex items-center space-x-4">
                                <NavLinks />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-zinc-400 hover:text-amber-500 transition-colors"
                                aria-label="Shopping cart"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                            <div className="sm:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    ) : (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
                            <NavLinks onClick={() => setIsMenuOpen(false)} />
                        </div>
                    </div>
                )}
            </header>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;
