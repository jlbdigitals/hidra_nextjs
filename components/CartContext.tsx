"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/cart";

interface CartContextType {
  items: CartItem[];
  total: number;
  sidebarOpen: boolean;
  addItem: (item: Omit<CartItem, "cantidad">) => void;
  ventaCount: number;
  cotizarCount: number;
  removeItem: (id: number) => void;
  updateCantidad: (id: number, cantidad: number) => void;
  clearCart: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "hidra_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "cantidad">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
    setSidebarOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateCantidad = useCallback((id: number, cantidad: number) => {
    if (cantidad <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const total = items.reduce((s, i) => s + i.cantidad, 0);
  const ventaCount = items.filter((i) => i.tipo === "venta").reduce((s, i) => s + i.cantidad, 0);
  const cotizarCount = items.filter((i) => i.tipo === "cotizar").reduce((s, i) => s + i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        ventaCount,
        cotizarCount,
        sidebarOpen,
        addItem,
        removeItem,
        updateCantidad,
        clearCart,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
