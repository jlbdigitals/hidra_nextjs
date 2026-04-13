"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice, getCartSubtotal } from "@/lib/cart";
import Link from "next/link";

export default function CarritoPage() {
  const { items, removeItem, updateCantidad, clearCart, ventaCount, cotizarCount } = useCart();
  const totalUnidades = items.reduce((s, i) => s + i.cantidad, 0);
  const subtotalVenta = getCartSubtotal({ items });

  const hasVenta = ventaCount > 0;
  const hasCotizar = cotizarCount > 0;

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10">
      <h1 className="font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>
        Mi Carrito
      </h1>

      {items.length === 0 ? (
        <div className="bg-[#F3F8F3] border border-[#e0e0e0] rounded p-12 text-center">
          <p className="text-[#54595F] font-semibold mb-2 text-lg">Tu carrito está vacío</p>
          <p className="text-[#7A7A7A] text-sm mb-6">Agrega productos desde el catálogo para realizar una compra o cotización.</p>
          <Link href="/catalogo" className="inline-block px-6 py-3 text-white font-semibold rounded" style={{ backgroundColor: "#53B94A" }}>
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items table */}
          <div className="flex-1">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                  <th className="text-left py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider" style={{ fontFamily: "Lato, sans-serif" }}>Producto</th>
                  <th className="text-center py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider" style={{ fontFamily: "Lato, sans-serif" }}>Cantidad</th>
                  <th className="text-right py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider" style={{ fontFamily: "Lato, sans-serif" }}>Total</th>
                  <th className="text-right py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wider w-10"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 shrink-0 bg-[#F3F8F3] rounded flex items-center justify-center" style={{ border: "1px solid #e0e0e0" }}>
                          {item.imagen ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          ) : <span className="text-xl">💧</span>}
                        </div>
                        <div>
                          <Link href={`/productos/${item.id}`} className="font-semibold text-sm hover:text-[#53B94A] block leading-tight mb-1" style={{ color: "#54595F" }}>{item.nombre}</Link>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${item.tipo === "venta" ? "bg-[#53B94A] text-white" : "bg-[#7A7A7A] text-white"}`}>
                            {item.tipo === "venta" ? "Venta" : "Cotizar"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => updateCantidad(item.id, item.cantidad - 1)} className="w-7 h-7 border rounded flex items-center justify-center font-bold text-[#54595F] hover:border-[#53B94A]" style={{ borderColor: "#e0e0e0" }}>−</button>
                        <span className="w-6 text-center font-semibold text-sm" style={{ color: "#54595F" }}>{item.cantidad}</span>
                        <button onClick={() => updateCantidad(item.id, item.cantidad + 1)} className="w-7 h-7 border rounded flex items-center justify-center font-bold text-[#54595F] hover:border-[#53B94A]" style={{ borderColor: "#e0e0e0" }}>+</button>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {item.tipo === "venta" && item.precio > 0 ? (
                        <span className="font-bold text-sm" style={{ color: "#53B94A" }}>{formatPrice(item.precio * item.cantidad)}</span>
                      ) : (
                        <span className="text-xs text-[#7A7A7A]">A cotizar</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button onClick={() => removeItem(item.id)} className="text-[#aaa] hover:text-red-400 text-sm">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button onClick={clearCart} className="text-sm text-[#7A7A7A] hover:text-red-400">Vaciar carrito</button>
              <Link href="/catalogo" className="text-sm font-semibold" style={{ color: "#53B94A" }}>← Seguir viendo</Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-[#F3F8F3] border border-[#e0e0e0] rounded p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>Resumen de pedido</h2>
              
              <div className="flex justify-between text-sm py-2">
                <span className="text-[#7A7A7A]">Productos</span>
                <span className="font-semibold text-[#54595F]">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm py-2 mb-4 border-b border-[#e0e0e0]">
                <span className="text-[#7A7A7A]">Unidades</span>
                <span className="font-semibold text-[#54595F]">{totalUnidades}</span>
              </div>

              {hasVenta && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-[#54595F]">Total Compra</span>
                    <span className="text-xl font-bold" style={{ color: "#53B94A" }}>{formatPrice(subtotalVenta)}</span>
                  </div>
                  <p className="text-[10px] text-[#7A7A7A] text-right mb-4">* Precios incluyen IVA</p>
                  <Link href="/checkout" className="block w-full text-center py-3.5 text-white font-bold rounded text-sm transition-opacity hover:opacity-90 shadow-sm" style={{ backgroundColor: "#53B94A" }}>
                    Finalizar compra
                  </Link>
                </div>
              )}

              {hasCotizar && (
                <div className={hasVenta ? "pt-4 border-t border-[#e0e0e0]" : ""}>
                  <p className="text-xs text-[#7A7A7A] mb-4">
                    {hasVenta ? "También tienes productos para cotizar. Un ejecutivo te contactará por ellos." : "Los productos se cotizarán según disponibilidad. Un ejecutivo te contactará a la brevedad."}
                  </p>
                  <Link href="/cotizar" className={`block w-full text-center py-3 font-bold rounded text-sm border-2 transition-colors ${hasVenta ? "text-[#7A7A7A] border-[#e0e0e0] hover:bg-white" : "text-[#53B94A] border-[#53B94A] hover:bg-[#F3F8F3]"}`}>
                    Solicitar cotización
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
