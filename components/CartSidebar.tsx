"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice, getCartSubtotal } from "@/lib/cart";
import Link from "next/link";

export default function CartSidebar() {
  const { items, total, ventaCount, cotizarCount, sidebarOpen, closeSidebar, removeItem, updateCantidad } =
    useCart();

  if (!sidebarOpen) return null;

  const subtotal = getCartSubtotal({ items });
  const hasVenta = ventaCount > 0;
  const hasCotizar = cotizarCount > 0;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={closeSidebar} />

      {/* Panel */}
      <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm flex flex-col bg-white shadow-2xl">

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-[#e0e0e0]"
          style={{ backgroundColor: "#F3F8F3" }}
        >
          <div>
            <h2
              className="font-bold text-lg leading-tight"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              Mi carrito
            </h2>
            {total > 0 && (
              <p className="text-xs text-[#7A7A7A] mt-0.5">
                {hasVenta && `${ventaCount} para compra`}
                {hasVenta && hasCotizar && " · "}
                {hasCotizar && `${cotizarCount} para cotizar`}
              </p>
            )}
          </div>
          <button onClick={closeSidebar} className="text-[#7A7A7A] hover:text-[#54595F] p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <svg className="w-16 h-16 text-[#e0e0e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-[#7A7A7A] text-sm">Tu carrito está vacío</p>
              <button onClick={closeSidebar} className="text-sm font-semibold" style={{ color: "#53B94A" }}>
                Ver productos →
              </button>
            </div>
          ) : (
            <>
              {/* Venta items */}
              {hasVenta && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#53B94A" }} />
                    Para compra
                  </p>
                  {items.filter(i => i.tipo === "venta").map((item) => (
                    <CartItemRow key={item.id} item={item} onRemove={removeItem} onUpdate={updateCantidad} showPrice />
                  ))}
                </div>
              )}

              {/* Cotizar items */}
              {hasCotizar && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A7A] mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#7A7A7A" }} />
                    Para cotizar
                  </p>
                  {items.filter(i => i.tipo === "cotizar").map((item) => (
                    <CartItemRow key={item.id} item={item} onRemove={removeItem} onUpdate={updateCantidad} showPrice={false} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#e0e0e0] flex flex-col gap-2">
            {/* Subtotal (only if there are venta items with prices) */}
            {hasVenta && subtotal > 0 && (
              <div className="flex justify-between items-center pb-2 border-b border-[#f0f0f0]">
                <span className="text-sm text-[#7A7A7A]">Subtotal compra</span>
                <span className="font-bold text-base" style={{ color: "#53B94A", fontFamily: "var(--font-nunito)" }}>
                  {formatPrice(subtotal)}
                </span>
              </div>
            )}

            {hasVenta && (
              <Link
                href="/carrito"
                onClick={closeSidebar}
                className="block w-full text-center py-3 text-white font-bold text-sm rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#53B94A" }}
              >
                Ver carrito y comprar ({ventaCount})
              </Link>
            )}
            {hasCotizar && (
              <Link
                href="/cotizar"
                onClick={closeSidebar}
                className="block w-full text-center py-2.5 font-semibold text-sm rounded border-2 transition-colors hover:bg-[#F3F8F3]"
                style={{ borderColor: "#53B94A", color: "#53B94A" }}
              >
                Solicitar cotización ({cotizarCount})
              </Link>
            )}
            <button
              onClick={closeSidebar}
              className="block w-full text-center py-2.5 font-semibold text-sm rounded border border-[#e0e0e0] text-[#54595F] hover:bg-[#F3F8F3]"
            >
              Seguir viendo productos
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// Extracted row component
function CartItemRow({
  item,
  onRemove,
  onUpdate,
  showPrice,
}: {
  item: { id: number; nombre: string; imagen: string | null; cantidad: number; topCategoria: string; precio: number };
  onRemove: (id: number) => void;
  onUpdate: (id: number, cantidad: number) => void;
  showPrice: boolean;
}) {
  return (
    <div className="flex gap-3 pb-4 mb-2 border-b border-[#f0f0f0] last:border-0 last:mb-0">
      <div
        className="w-16 h-16 shrink-0 bg-[#F3F8F3] flex items-center justify-center overflow-hidden rounded"
        style={{ border: "1px solid #e0e0e0" }}
      >
        {item.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-full h-full object-contain p-1"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <span className="text-2xl">💧</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: "#54595F", fontFamily: "var(--font-nunito)" }}>
          {item.nombre}
        </p>
        {showPrice && item.precio > 0 ? (
          <p className="text-xs font-bold mt-0.5" style={{ color: "#53B94A" }}>
            {formatPrice(item.precio * item.cantidad)}
          </p>
        ) : (
          <p className="text-xs text-[#7A7A7A] mt-0.5">{item.topCategoria}</p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdate(item.id, item.cantidad - 1)}
            className="w-6 h-6 rounded border border-[#e0e0e0] flex items-center justify-center text-sm font-bold text-[#54595F] hover:border-[#53B94A] hover:text-[#53B94A]"
          >
            −
          </button>
          <span className="text-sm font-semibold text-[#54595F] w-5 text-center">{item.cantidad}</span>
          <button
            onClick={() => onUpdate(item.id, item.cantidad + 1)}
            className="w-6 h-6 rounded border border-[#e0e0e0] flex items-center justify-center text-sm font-bold text-[#54595F] hover:border-[#53B94A] hover:text-[#53B94A]"
          >
            +
          </button>
          <button onClick={() => onRemove(item.id)} className="ml-auto text-xs text-[#aaa] hover:text-red-400">
            Quitar
          </button>
        </div>
      </div>
    </div>
  );
}
