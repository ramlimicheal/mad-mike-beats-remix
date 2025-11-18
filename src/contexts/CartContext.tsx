import React, { createContext, useContext, useState } from 'react';
import { Beat, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (beat: Beat, licenseType: 'basic' | 'premium' | 'exclusive') => void;
  removeFromCart: (beatId: string | number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (beat: Beat, licenseType: 'basic' | 'premium' | 'exclusive') => {
    setItems(prev => {
      const existing = prev.find(item => item.beat.id === beat.id);
      if (existing) {
        return prev.map(item =>
          item.beat.id === beat.id ? { ...item, licenseType } : item
        );
      }
      return [...prev, { beat, licenseType }];
    });
  };

  const removeFromCart = (beatId: string | number) => {
    setItems(prev => prev.filter(item => item.beat.id.toString() !== beatId.toString()));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => {
    return sum + item.beat.price[item.licenseType];
  }, 0);

  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
