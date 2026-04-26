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
    <div className="bg-white min-h-screen pb-32">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-100 pt-16 pb-12 mb-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em]">Flujo de compra</span>
            <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>
              Mi Carrito
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        {items.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-24 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1e293b] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>Tu carrito está esperando</h2>
            <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto">Explora nuestro catálogo industrial y agrega los equipos que necesitas para tu proyecto.</p>
            <Link 
              href="/catalogo" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#006e0c] text-white font-extrabold rounded-2xl shadow-xl shadow-[#006e0c]/20 hover:bg-[#005a0a] transition-all"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Items Column */}
            <div className="flex-1 w-full">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-100">
                      <th className="text-left py-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Detalle del Producto</th>
                      <th className="text-center py-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Cantidad</th>
                      <th className="text-right py-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Subtotal</th>
                      <th className="py-6 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {items.map((item) => (
                      <tr key={item.id} className="group">
                        <td className="py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-24 h-24 shrink-0 bg-[#f8fafc] rounded-[24px] border border-slate-100 flex items-center justify-center overflow-hidden p-2 group-hover:border-[#4059aa]/20 transition-all">
                              {item.imagen ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain mix-blend-multiply" />
                              ) : <span className="text-3xl text-slate-300">💧</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                              <Link 
                                href={`/productos/${item.id}`} 
                                className="font-extrabold text-lg text-[#1e293b] hover:text-[#4059aa] leading-tight transition-colors"
                                style={{ fontFamily: "var(--font-manrope)" }}
                              >
                                {item.nombre}
                              </Link>
                              <div className="flex items-center gap-3">
                                <span className={`text-[9px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider ${
                                  item.tipo === "venta" ? "bg-[#006e0c]/10 text-[#006e0c]" : "bg-slate-100 text-slate-500"
                                }`}>
                                  {item.tipo === "venta" ? "Venta Directa" : "Por Cotizar"}
                                </span>
                                {item.tipo === "venta" && (
                                  <span className="text-[11px] font-bold text-slate-400">{formatPrice(item.precio)} c/u</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-8">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => updateCantidad(item.id, item.cantidad - 1)} 
                              className="w-10 h-10 rounded-xl border-2 border-slate-100 flex items-center justify-center text-[#1e293b] hover:border-[#006e0c] hover:text-[#006e0c] transition-all font-black text-lg"
                            >−</button>
                            <span className="w-8 text-center font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>{item.cantidad}</span>
                            <button 
                              onClick={() => updateCantidad(item.id, item.cantidad + 1)} 
                              className="w-10 h-10 rounded-xl border-2 border-slate-100 flex items-center justify-center text-[#1e293b] hover:border-[#006e0c] hover:text-[#006e0c] transition-all font-black text-lg"
                            >+</button>
                          </div>
                        </td>
                        <td className="py-8 text-right">
                          {item.tipo === "venta" && item.precio > 0 ? (
                            <span className="text-xl font-extrabold text-[#006e0c]" style={{ fontFamily: "var(--font-manrope)" }}>
                              {formatPrice(item.precio * item.cantidad)}
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">P. Pendiente</span>
                          )}
                        </td>
                        <td className="py-8 text-right">
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
                <button 
                  onClick={clearCart} 
                  className="group flex items-center gap-2 text-sm font-extrabold text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Vaciar mi carrito</span>
                </button>
                <Link 
                  href="/catalogo" 
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#4059aa] hover:text-[#1e293b] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7 7-7" />
                  </svg>
                  <span>Seguir explorando equipos</span>
                </Link>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:w-[400px] shrink-0 sticky top-32">
              <div className="bg-[#f8fafc] rounded-[40px] p-10 border border-slate-100 shadow-[0px_40px_80px_rgba(0,0,0,0.03)]">
                <h2 className="text-2xl font-extrabold text-[#1e293b] mb-8 tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>Resumen Industrial</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Ítems en carro</span>
                    <span className="font-extrabold text-[#1e293b]">{items.length} productos</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pb-6 border-b border-slate-200">
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Unidades totales</span>
                    <span className="font-extrabold text-[#1e293b]">{totalUnidades} unidades</span>
                  </div>
                </div>

                {hasVenta && (
                  <div className="mb-10">
                    <div className="flex flex-col gap-1 mb-6">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Total compra inmediata</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-[#006e0c]" style={{ fontFamily: "var(--font-manrope)" }}>{formatPrice(subtotalVenta)}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IVA Incl.</span>
                      </div>
                    </div>
                    <Link 
                      href="/checkout" 
                      className="flex items-center justify-center gap-3 w-full py-5 bg-[#006e0c] text-white font-extrabold rounded-2xl shadow-xl shadow-[#006e0c]/20 hover:bg-[#005a0a] transition-all hover:scale-[1.02] active:scale-95"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      <span>Finalizar mi compra</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}

                {hasCotizar && (
                  <div className={hasVenta ? "pt-8 border-t border-slate-200" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#4059aa]/5 flex items-center justify-center text-[#4059aa]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>Productos por cotizar</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                      {hasVenta 
                        ? "Tu carro incluye equipos de alta rotación que requieren confirmación técnica por un ejecutivo antes de su facturación." 
                        : "Uno de nuestros expertos técnicos revisará tu requerimiento y te enviará una cotización formal en menos de 24 horas hábiles."}
                    </p>
                    <Link 
                      href="/cotizar" 
                      className={`flex items-center justify-center gap-3 w-full py-4 font-extrabold rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-95 ${
                        hasVenta 
                          ? "border-slate-200 text-slate-400 hover:border-[#4059aa] hover:text-[#4059aa] bg-white" 
                          : "border-[#4059aa] text-[#4059aa] bg-white hover:bg-[#4059aa] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      Solicitar cotización
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
