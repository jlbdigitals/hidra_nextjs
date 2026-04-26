"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice, getCartSubtotal } from "@/lib/cart";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGIONES_CHILE } from "@/lib/constants";

export default function CheckoutPage() {
  const { items, ventaCount } = useCart();
  const router = useRouter();
  const subtotalVenta = getCartSubtotal({ items });
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    rutEmpresa: "",
    email: "",
    telefono: "",
    direccion: "",
    comuna: "",
    region: "",
  });

  if (ventaCount === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1e293b] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>No hay productos para compra inmediata</h1>
        <p className="text-slate-500 font-medium mb-10">Tu carrito no contiene productos con precio para venta directa en este momento.</p>
        <Link href="/catalogo" className="inline-flex px-8 py-4 bg-[#1e293b] text-white font-extrabold rounded-2xl hover:bg-black transition-all">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/transbank/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: items.filter(i => i.tipo === "venta"),
          total: subtotalVenta
        }),
      });

      const data = await res.json();
      if (data.url && data.token) {
        // Redirect to Transbank
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.url;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = data.token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Error al iniciar el pago: " + (data.error || "Intente nuevamente"));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 pt-16 pb-12 mb-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.4em]">
              <Link href="/carrito" className="hover:text-[#4059aa] transition-colors">Carrito</Link>
              <span className="opacity-50">/</span>
              <span className="text-[#1e293b]">Checkout</span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>
              Finalizar Compra
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-extrabold">1</div>
                  <h2 className="text-2xl font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>
                    Información de Facturación y Envío
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-slate-50/50 p-10 rounded-[32px] border border-slate-100">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Nombre completo</label>
                    <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Empresa (Opcional)</label>
                    <input name="empresa" value={formData.empresa} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="Empresa SPA" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">RUT Empresa (Opcional)</label>
                    <input name="rutEmpresa" value={formData.rutEmpresa} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="76.xxx.xxx-x" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Correo electrónico</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="juan@hidra.cl" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Teléfono de contacto</label>
                    <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="+56 9 xxxx xxxx" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Dirección de despacho</label>
                    <input required name="direccion" value={formData.direccion} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="Calle, número, depto u oficina" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Comuna</label>
                    <input required name="comuna" value={formData.comuna} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" placeholder="Santiago" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Región</label>
                    <select 
                      required 
                      name="region" 
                      value={formData.region} 
                      onChange={(e: any) => setFormData({ ...formData, region: e.target.value })} 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione región</option>
                      {REGIONES_CHILE.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-extrabold">2</div>
                  <h2 className="text-2xl font-extrabold text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>
                    Método de Pago Seguro
                  </h2>
                </div>
                <div className="p-8 border-2 border-[#006e0c] bg-[#006e0c]/5 rounded-[32px] flex items-center gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#006e0c]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-6 h-6 rounded-full border-2 border-[#006e0c] flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#006e0c]" />
                  </div>
                  <div className="flex-1">
                    <span className="block font-extrabold text-lg text-[#1e293b]" style={{ fontFamily: "var(--font-manrope)" }}>Webpay Plus</span>
                    <span className="text-sm font-medium text-slate-500">Paga con tarjetas de crédito, débito o prepago de forma 100% segura.</span>
                  </div>
                  <img src="https://www.transbank.cl/public/images/webpay-plus.png" alt="Webpay" className="h-8 relative z-10" />
                </div>
              </section>
              
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-6 rounded-[24px] text-xl font-extrabold transition-all shadow-2xl flex items-center justify-center gap-4 group ${
                  loading 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-[#006e0c] text-white hover:bg-[#005a0a] shadow-[#006e0c]/20 hover:scale-[1.01] active:scale-95'
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Procesando pago...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar y Pagar</span>
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[420px] shrink-0 sticky top-32">
            <div className="bg-[#1e293b] text-white rounded-[40px] p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-extrabold mb-10 tracking-tight relative z-10" style={{ fontFamily: "var(--font-manrope)" }}>
                Resumen de Compra
              </h2>
              
              <div className="space-y-6 mb-10 relative z-10">
                {items.filter(i => i.tipo === "venta").map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold leading-tight text-white/90" style={{ fontFamily: "var(--font-manrope)" }}>{item.nombre}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Cantidad: {item.cantidad}</p>
                    </div>
                    <span className="text-sm font-extrabold text-[#53B94A]">{formatPrice(item.precio * item.cantidad)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 space-y-3 relative z-10">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/40">
                  <span>Neto estimado</span>
                  <span>{formatPrice(subtotalVenta / 1.19)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/40 pb-4">
                  <span>IVA (19%)</span>
                  <span>{formatPrice(subtotalVenta - (subtotalVenta / 1.19))}</span>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-white/10">
                  <span className="text-lg font-extrabold text-white/60">Total Final</span>
                  <span className="text-4xl font-extrabold text-[#53B94A]" style={{ fontFamily: "var(--font-manrope)" }}>{formatPrice(subtotalVenta)}</span>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-white/5 rounded-3xl relative z-10">
                <div className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-[#53B94A] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-[10px] font-medium text-white/50 leading-relaxed uppercase tracking-wider">
                    Transacción protegida por protocolos de seguridad bancaria. Sus datos de pago nunca se almacenan en nuestros servidores.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
