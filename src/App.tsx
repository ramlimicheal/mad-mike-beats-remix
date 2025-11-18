import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlayerProvider } from './contexts/PlayerContext';
import { CartProvider } from './contexts/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

import Header from './components/Header';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import { CustomCursor } from './components/CustomCursor';

import HomePage from './pages/HomePage';
import BeatsPage from './pages/BeatsPage';
import BeatDetailPage from './pages/BeatDetailPage';
import LicensingPage from './pages/LicensingPage';
import MixMasteringPage from './pages/MixMasteringPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <PlayerProvider>
          <BrowserRouter>
          <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/beats" element={<BeatsPage />} />
                <Route path="/beats/:id" element={<BeatDetailPage />} />
                <Route path="/licensing" element={<LicensingPage />} />
                <Route path="/mix-mastering" element={<MixMasteringPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
            <AudioPlayer />
            <CustomCursor />
          </div>
          </BrowserRouter>
        </PlayerProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
