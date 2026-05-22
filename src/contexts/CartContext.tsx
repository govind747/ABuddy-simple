import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CartPackage {
  id: number;
  title: string;
  destinationName: string | null;
  imageUrl: string;
  price: number;
  duration: string;
  rating?: number | null;
}

export interface CartItem {
  package: CartPackage;
  travelers: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (pkg: CartPackage, travelers?: number) => void;
  removeItem: (packageId: number) => void;
  updateTravelers: (packageId: number, travelers: number) => void;
  clearCart: () => void;
  isInCart: (packageId: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'tt_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((pkg: CartPackage, travelers = 1) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.package.id === pkg.id);
      if (exists) return prev;
      return [...prev, { package: pkg, travelers }];
    });
  }, []);

  const removeItem = useCallback((packageId: number) => {
    setItems((prev) => prev.filter((i) => i.package.id !== packageId));
  }, []);

  const updateTravelers = useCallback((packageId: number, travelers: number) => {
    setItems((prev) =>
      prev.map((i) => (i.package.id === packageId ? { ...i, travelers: Math.max(1, travelers) } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (packageId: number) => items.some((i) => i.package.id === packageId),
    [items]
  );

  const count = items.length;
  const total = items.reduce((s, i) => s + i.package.price * i.travelers, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateTravelers, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
