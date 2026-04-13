"use client";

import { useCart } from "@/components/CartContext";
import type { Product } from "@/lib/products";
import { getProductImageSrc } from "@/lib/products";
import { isVenta, formatPrice } from "@/lib/cart";

interface Props {
  product: Product;
  className?: string;
  full?: boolean;
  showPrice?: boolean;
}

export default function AddToCartButton({ product, className, full, showPrice }: Props) {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.id === product.id);
  const tipo = isVenta(product.topCategoria) && product.precio > 0 ? "venta" : "cotizar";
  const hasPrice = product.precio > 0;

  function handleAdd() {
    addItem({
      id: product.id,
      nombre: product.nombre,
      imagen: getProductImageSrc(product),
      topCategoria: product.topCategoria,
      tipo,
      precio: product.precio ?? 0,
    });
  }

  // --- VENTA (Bombas con precio) ---
  if (tipo === "venta") {
    return (
      <div className={`flex flex-col gap-1 ${className || ""}`}>
        {showPrice && hasPrice && (
          <p className="text-lg font-bold" style={{ color: "#53B94A", fontFamily: "var(--font-nunito)" }}>
            {formatPrice(product.precio)}
            <span className="text-xs font-normal text-[#7A7A7A] ml-1">+ IVA</span>
          </p>
        )}
        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-2 font-semibold rounded transition-colors ${full ? "w-full py-3 px-5 text-sm" : "py-1.5 px-3 text-sm"}`}
          style={{
            backgroundColor: inCart ? "#449c3d" : "#53B94A",
            color: "white",
          }}
        >
          {inCart ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {full ? "Agregado al carrito" : "✓ En carrito"}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {full ? "Agregar al carrito" : "Agregar"}
            </>
          )}
        </button>
      </div>
    );
  }

  // --- COTIZAR (no-Bombas o Bombas sin precio) ---
  return (
    <button
      onClick={handleAdd}
      className={`flex items-center justify-center gap-2 font-semibold rounded border-2 transition-colors ${full ? "w-full py-3 px-5 text-sm" : "py-1.5 px-3 text-sm"} ${className || ""}`}
      style={
        inCart
          ? { borderColor: "#53B94A", color: "#53B94A", backgroundColor: "#F3F8F3" }
          : { borderColor: "#7A7A7A", color: "#54595F", backgroundColor: "white" }
      }
    >
      {inCart ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {full ? "Agregado a cotización" : "✓ Cotizar"}
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {full ? "Solicitar cotización" : "Cotizar"}
        </>
      )}
    </button>
  );
}
