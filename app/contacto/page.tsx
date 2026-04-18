import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Hidra",
  description: "Contáctenos para consultas, cotizaciones y soporte técnico.",
};

export default function ContactoPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{ backgroundColor: "#53B94A" }}
      >
        <h1
          className="text-4xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          Contáctenos
        </h1>
        <p className="text-white/90 text-base">
          Estamos disponibles para resolver sus consultas y entregar cotizaciones.
        </p>
      </div>

      {/* Info cards strip */}
      <div style={{ backgroundColor: "#F4F7F3" }}>
        <div className="max-w-[1140px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div
              className="flex flex-col items-center text-center p-5 rounded-lg bg-white"
              style={{ border: "1px solid #e0e0e0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "#53B94A" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#53B94A" }}>Teléfonos</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>Oficina: 2 2723 8788</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>Celular: +56 9 9710 7845</p>
            </div>

            <a
              href="mailto:contacto@hidra.cl"
              className="flex flex-col items-center text-center p-5 rounded-lg bg-white transition-shadow hover:shadow-md"
              style={{ border: "1px solid #e0e0e0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "#53B94A" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#53B94A" }}>Email</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>contacto@hidra.cl</p>
            </a>

            <div
              className="flex flex-col items-center text-center p-5 rounded-lg bg-white"
              style={{ border: "1px solid #e0e0e0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "#53B94A" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#53B94A" }}>Ubicación</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>Maipú, Región Metropolitana</p>
            </div>

            <div
              className="flex flex-col items-center text-center p-5 rounded-lg bg-white"
              style={{ border: "1px solid #e0e0e0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "#53B94A" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#53B94A" }}>Horario</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>Lun–Vie 9:00–18:00</p>
              <p className="text-sm font-semibold" style={{ color: "#54595F" }}>Sábados: Cerrado</p>
            </div>

          </div>
        </div>
      </div>

      {/* Form + WhatsApp */}
      <div className="max-w-[1140px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <h2
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              Envíenos un mensaje
            </h2>
            <div className="h-1 w-10 rounded mb-5" style={{ backgroundColor: "#53B94A" }} />
            <ContactForm />
          </div>

          {/* Side panel — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/56997107845"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <p className="text-base font-bold">WhatsApp</p>
                <p className="text-sm opacity-90">Respuesta rápida</p>
              </div>
            </a>

            {/* Info box */}
            <div
              className="p-5 rounded-lg flex-1"
              style={{ backgroundColor: "#F4F7F3", border: "1px solid #e0e0e0" }}
            >
              <h3
                className="font-bold mb-3 text-sm"
                style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
              >
                ¿En qué podemos ayudarle?
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "Cotizaciones de productos",
                  "Asesoría técnica",
                  "Consultas sobre stock",
                  "Servicio de zanjado",
                  "Soporte postventa",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#7A7A7A" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#53B94A" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
