"use client";

import { useCart } from "@/components/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CotizarPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono) {
      setError("Por favor completa nombre, email y teléfono.");
      return;
    }
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productos: items.map((i) => ({ id: i.id, nombre: i.nombre, cantidad: i.cantidad })),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        clearCart();
        setSent(true);
      } else {
        setError(data.error || "Error al enviar. Intenta nuevamente.");
      }
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white min-h-[80vh] flex items-center justify-center py-32">
        <div className="max-w-[600px] w-full mx-auto px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#006e0c]/10 flex items-center justify-center mx-auto mb-10 text-[#006e0c] shadow-2xl shadow-[#006e0c]/10">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1e293b] mb-4 tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>¡Solicitud enviada con éxito!</h1>
          <p className="text-lg text-slate-500 font-medium mb-12">Recibimos tu requerimiento. Uno de nuestros ejecutivos técnicos procesará tu cotización y te contactará a la brevedad con precios actualizados y plazos de entrega.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/productos" 
              className="px-10 py-5 bg-[#1e293b] text-white font-extrabold rounded-2xl shadow-xl shadow-black/10 hover:bg-black transition-all"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Volver al Catálogo
            </Link>
            <Link 
              href="/" 
              className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 font-extrabold rounded-2xl hover:border-[#4059aa] hover:text-[#4059aa] transition-all"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 pt-16 pb-12 mb-12">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#4059aa] uppercase tracking-[0.4em]">
              <Link href="/carrito" className="hover:text-[#4059aa] transition-colors">Carrito</Link>
              <span className="opacity-50">/</span>
              <span className="text-[#1e293b]">Solicitud de Cotización</span>
            </div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-manrope)" }}>
              Asesoría y Cotización Técnica
            </h1>
            <p className="text-slate-500 font-medium max-w-2xl">
              Equipos de alta ingeniería que requieren validación técnica antes de su adquisición.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Form */}
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Nombre y Apellido *</label>
                  <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Juan Pérez"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Empresa / Organización</label>
                  <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Empresa SPA (opcional)"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Correo Electrónico *</label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="correo@empresa.cl"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Teléfono de contacto *</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange} required placeholder="+56 9 xxxx xxxx"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-widest mb-2">Requerimientos Adicionales</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={6} placeholder="Detalla condiciones de uso, voltaje requerido, HP, plazos de entrega u otros detalles críticos para tu proyecto..."
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold text-[#1e293b] focus:border-[#4059aa] focus:ring-4 focus:ring-[#4059aa]/5 outline-none transition-all resize-none" />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={sending || items.length === 0}
                className={`w-full py-6 rounded-[24px] text-xl font-extrabold transition-all shadow-2xl flex items-center justify-center gap-4 group ${
                  sending 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-[#006e0c] text-white hover:bg-[#005a0a] shadow-[#006e0c]/20 hover:scale-[1.01] active:scale-95'
                }`}
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando solicitud...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Solicitud de Cotización</span>
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              {items.length === 0 && (
                <div className="p-10 bg-slate-50 border border-slate-100 rounded-[32px] text-center">
                  <p className="text-slate-400 font-bold text-sm mb-6 uppercase tracking-widest">No hay productos en tu lista de cotización</p>
                  <Link 
                    href="/productos" 
                    className="inline-flex items-center gap-2 text-[#4059aa] font-extrabold hover:text-[#1e293b] transition-all"
                  >
                    <span>Ver catálogo de productos</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[420px] shrink-0 sticky top-32">
            <div className="bg-[#1e293b] text-white rounded-[40px] p-10 shadow-2xl overflow-hidden relative mb-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              
              <h2 className="text-2xl font-extrabold mb-8 tracking-tight relative z-10" style={{ fontFamily: "var(--font-manrope)" }}>
                Ítems a Cotizar ({total})
              </h2>
              
              {items.length === 0 ? (
                <p className="text-white/30 font-bold uppercase text-[10px] tracking-widest relative z-10">Lista vacía</p>
              ) : (
                <ul className="space-y-6 mb-10 relative z-10">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 group">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/5 flex items-center justify-center p-2 group-hover:bg-white transition-all overflow-hidden shrink-0">
                        {item.imagen ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain" />
                        ) : <span className="text-xl">💧</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold leading-tight text-white/90 line-clamp-2" style={{ fontFamily: "var(--font-manrope)" }}>{item.nombre}</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Cant: {item.cantidad}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="border-t border-white/10 pt-8 relative z-10">
                <Link 
                  href="/carrito" 
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#53B94A] hover:text-white transition-colors uppercase tracking-widest"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7 7-7" />
                  </svg>
                  <span>Editar mi selección</span>
                </Link>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-[#f8fafc] rounded-[32px] p-8 border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#006e0c]/5 rounded-2xl flex items-center justify-center text-[#006e0c] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase text-[#94a3b8] tracking-widest mb-1">Atención Telefónica</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+56997107845" className="text-base font-extrabold text-[#1e293b] hover:text-[#006e0c] transition-colors">+56 9 9710 7845</a>
                  <a href="tel:+56227238788" className="text-base font-extrabold text-[#1e293b] hover:text-[#006e0c] transition-colors">+56 2 2723 8788</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
