"use client";

import { useCart } from "@/components/CartContext";

export default function CartButton() {
  const { total, openSidebar } = useCart();

  return (
    <button
      onClick={openSidebar}
      className="relative flex items-center gap-1.5 text-[#7A7A7A] hover:text-[#53B94A] transition-colors whitespace-nowrap"
      aria-label="Ver carrito"
    >
      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="text-sm font-semibold hidden sm:block">Carrito</span>
      {total > 0 && (
        <span
          className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-[10px] font-bold px-1"
          style={{ backgroundColor: "#53B94A" }}
        >
          {total}
        </span>
      )}
    </button>
  );
}
