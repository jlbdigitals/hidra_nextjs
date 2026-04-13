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
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#F3F8F3" }}>
          <svg className="w-10 h-10" style={{ color: "#53B94A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-bold text-2xl mb-2" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>¡Cotización enviada!</h1>
        <p className="text-[#7A7A7A] mb-6">Recibimos tu solicitud. Un ejecutivo te contactará a la brevedad para entregarte los precios y disponibilidad.</p>
        <Link href="/productos" className="inline-block px-6 py-3 text-white font-semibold rounded" style={{ backgroundColor: "#53B94A" }}>
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-10">
      <h1 className="font-bold text-2xl mb-2" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>Solicitar cotización</h1>
      <p className="text-[#7A7A7A] text-sm mb-8">Completa el formulario y te contactamos con precios y disponibilidad.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#54595F]">Nombre *</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre"
                className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#53B94A] text-[#54595F]"
                style={{ borderColor: "#e0e0e0" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#54595F]">Empresa</label>
              <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Empresa (opcional)"
                className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#53B94A] text-[#54595F]"
                style={{ borderColor: "#e0e0e0" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#54595F]">Email *</label>
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="correo@empresa.cl"
                className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#53B94A] text-[#54595F]"
                style={{ borderColor: "#e0e0e0" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#54595F]">Teléfono *</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} required placeholder="+56 9 xxxx xxxx"
                className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#53B94A] text-[#54595F]"
                style={{ borderColor: "#e0e0e0" }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-[#54595F]">Mensaje adicional</label>
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Especifica voltaje, HP, cantidad, aplicación u otros detalles..."
              className="w-full border rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#53B94A] text-[#54595F] resize-y"
              style={{ borderColor: "#e0e0e0" }} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={sending || items.length === 0}
            className="w-full py-3 text-white font-bold rounded text-sm disabled:opacity-60 transition-opacity"
            style={{ backgroundColor: "#53B94A" }}>
            {sending ? "Enviando..." : `Enviar cotización (${total} producto${total !== 1 ? "s" : ""})`}
          </button>

          {items.length === 0 && (
            <p className="text-center text-sm text-[#7A7A7A]">Tu cotización está vacía. <Link href="/productos" className="font-semibold" style={{ color: "#53B94A" }}>Ver productos →</Link></p>
          )}
        </form>

        {/* Products summary */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-[#F3F8F3] border border-[#e0e0e0] rounded p-5">
            <h2 className="font-bold text-sm mb-4" style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}>
              Productos a cotizar ({total})
            </h2>
            {items.length === 0 ? (
              <p className="text-xs text-[#7A7A7A]">Sin productos.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 pb-3 border-b border-[#e0e0e0] last:border-0 last:pb-0">
                    <div className="w-10 h-10 shrink-0 bg-white rounded flex items-center justify-center overflow-hidden" style={{ border: "1px solid #e0e0e0" }}>
                      {item.imagen ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain p-0.5" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : <span className="text-sm">💧</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-snug line-clamp-2" style={{ color: "#54595F" }}>{item.nombre}</p>
                      <p className="text-xs text-[#7A7A7A]">Cant: {item.cantidad}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 pt-3 border-t border-[#e0e0e0]">
              <Link href="/carrito" className="text-xs font-semibold" style={{ color: "#53B94A" }}>← Editar cotización</Link>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-4 bg-white border border-[#e0e0e0] rounded p-4">
            <p className="text-xs font-semibold text-[#54595F] mb-2">¿Prefieres llamar?</p>
            <a href="tel:+56997107845" className="text-sm font-semibold block mb-1 hover:underline" style={{ color: "#53B94A" }}>+56 9 9710 7845</a>
            <a href="tel:+56227238788" className="text-sm font-semibold block hover:underline" style={{ color: "#53B94A" }}>+56 2 2723 8788</a>
          </div>
        </div>
      </div>
    </div>
  );
}
