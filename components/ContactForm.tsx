"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with real API call if needed
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#53B94A" }}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
        >
          ¡Mensaje enviado!
        </h3>
        <p className="text-sm" style={{ color: "#7A7A7A" }}>
          Nos pondremos en contacto con usted a la brevedad.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" }); }}
          className="text-sm font-semibold hover:underline"
          style={{ color: "#53B94A" }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const inputClass = "w-full border border-[#e0e0e0] rounded px-3 py-2 text-sm text-[#54595F] bg-white placeholder-[#aaa] focus:outline-none focus:border-[#53B94A]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "#54595F" }}>
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Su nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "#54595F" }}>
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "#54595F" }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="correo@ejemplo.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "#54595F" }}>
          Asunto
        </label>
        <select
          name="asunto"
          value={form.asunto}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seleccione un asunto</option>
          <option value="cotizacion">Cotización de productos</option>
          <option value="soporte">Soporte técnico</option>
          <option value="consulta">Consulta general</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "#54595F" }}>
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Escriba su consulta aquí..."
          className={inputClass}
          style={{ resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "#53B94A" }}
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
