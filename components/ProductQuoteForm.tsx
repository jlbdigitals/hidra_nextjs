"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  productId: number;
  productName: string;
  productCategory: string;
  productBrand: string | null;
  productHp: string[];
  productVoltaje: string[];
  productPrice: number;
}

export default function ProductQuoteForm({
  productId,
  productName,
  productCategory,
  productBrand,
  productHp,
  productVoltaje,
  productPrice,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productos: [
            {
              id: productId,
              nombre: productName,
              cantidad: 1,
            },
          ],
          // Include extra product info in the message
          mensaje: [
            formData.mensaje,
            `\n--- Producto ---`,
            `Nombre: ${productName}`,
            `ID: ${productId}`,
            `Categoría: ${productCategory}`,
            productBrand ? `Marca: ${productBrand}` : null,
            productHp.length > 0 ? `HP: ${productHp.join(", ")}` : null,
            productVoltaje.length > 0 ? `Voltaje: ${productVoltaje.join(", ")}V` : null,
            productPrice > 0 ? `Precio ref: $${productPrice.toLocaleString("es-CL")}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (res.ok) {
        router.push("/gracias-cotizar");
      } else {
        alert("Error al enviar la cotización. Intente nuevamente.");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 font-bold text-sm rounded transition-all hover:opacity-90 text-white"
        style={{ backgroundColor: "#53B94A" }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Cotizar este producto
      </button>
    );
  }

  if (sent) {
    return (
      <div className="bg-[#F3F8F3] border border-[#53B94A] rounded-lg p-6 text-center">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-[#53B94A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-bold text-[#54595F] mb-1">¡Cotización enviada!</p>
        <p className="text-sm text-[#7A7A7A]">Nos pondremos en contacto contigo a la brevedad.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#e0e0e0] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#53B94A" }}>
        <span className="text-white font-bold text-sm">Cotizar: {productName}</span>
        <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-lg leading-none">✕</button>
      </div>

      {/* Product info summary */}
      <div className="px-4 py-3 bg-[#F3F8F3] border-b border-[#e0e0e0] text-xs text-[#7A7A7A] space-y-1">
        <p><span className="font-semibold text-[#54595F]">Producto:</span> {productName}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span><span className="font-semibold text-[#54595F]">Categoría:</span> {productCategory}</span>
          {productBrand && <span><span className="font-semibold text-[#54595F]">Marca:</span> {productBrand}</span>}
          {productHp.length > 0 && <span><span className="font-semibold text-[#54595F]">HP:</span> {productHp.join(", ")}</span>}
          {productVoltaje.length > 0 && <span><span className="font-semibold text-[#54595F]">Voltaje:</span> {productVoltaje.join(", ")}V</span>}
          {productPrice > 0 && (
            <span><span className="font-semibold text-[#54595F]">Precio ref:</span> ${productPrice.toLocaleString("es-CL")}</span>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Nombre *</label>
            <input required name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm focus:border-[#53B94A] outline-none" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Empresa</label>
            <input name="empresa" value={formData.empresa} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm focus:border-[#53B94A] outline-none" placeholder="Nombre empresa" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Email *</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm focus:border-[#53B94A] outline-none" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Teléfono *</label>
            <input required name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm focus:border-[#53B94A] outline-none" placeholder="+569 1234 5678" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-[#7A7A7A] mb-1">Mensaje (opcional)</label>
          <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={3} className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm focus:border-[#53B94A] outline-none resize-none" placeholder="Consultas adicionales, cantidades, etc." />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded text-sm transition-all ${loading ? "bg-[#7A7A7A] cursor-not-allowed" : "bg-[#53B94A] hover:bg-[#46a13e]"}`}
        >
          {loading ? "Enviando..." : "Enviar cotización"}
        </button>
      </form>
    </div>
  );
}
