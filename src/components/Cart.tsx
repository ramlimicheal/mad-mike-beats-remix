import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShineBorder } from './ui/shine-border';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, totalAmount, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-zinc-900 z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-zinc-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.beat.id}-${item.licenseType}`}
                  className="relative overflow-hidden bg-zinc-800 rounded-lg p-4"
                >
                  <ShineBorder />
                  <div className="flex gap-4">
                    <img
                      src={item.beat.artworkUrl}
                      alt={item.beat.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.beat.title}</h3>
                      <p className="text-xs text-zinc-400 capitalize">
                        {item.licenseType} License
                      </p>
                      <p className="text-sm font-bold mt-1 text-amber-400">${item.beat.price[item.licenseType]}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.beat.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-amber-400">${totalAmount.toFixed(2)}</span>
            </div>
            <a href="/checkout" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-md hover:from-amber-400 hover:to-orange-400 transition-colors shadow-lg shadow-amber-500/20 text-center block">
              Proceed to Checkout
            </a>
            <button
              onClick={clearCart}
              className="w-full bg-zinc-800 text-zinc-300 font-semibold py-2 rounded-md hover:bg-zinc-700 transition-colors text-sm"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
