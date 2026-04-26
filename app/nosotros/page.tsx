import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros — Hidra",
  description: "Conozca a Hidra, distribuidores de bombas de agua y sistemas de riego en Chile.",
};

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Calidad",
    description: "Distribuimos marcas líderes con garantía y respaldo técnico comprobado.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Experiencia",
    description: "Años de trayectoria en el mercado hidráulico nacional nos avalan.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Eficiencia",
    description: "Soluciones rápidas y confiables para proyectos industriales y agrícolas.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Soporte",
    description: "Asesoría técnica especializada para elegir el equipo adecuado.",
  },
];

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="relative h-52 flex items-center justify-center"
        style={{ backgroundColor: "#53B94A" }}
      >
        <div className="text-center text-white px-4">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Sobre Nosotros
          </h1>
          <p className="text-base opacity-90">
            Distribuidores de soluciones hidráulicas en Chile
          </p>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 py-12">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              Nuestra historia
            </h2>
            <div className="h-1 w-12 rounded mb-5" style={{ backgroundColor: "#53B94A" }} />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7A7A" }}>
              Hidra es una empresa especializada en la distribución de bombas de agua, filtros,
              sistemas de riego y equipos hidráulicos para los sectores industrial y agrícola de Chile.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7A7A" }}>
              Contamos con un amplio catálogo de más de 600 productos de marcas reconocidas a nivel
              mundial, ofreciendo soluciones completas para proyectos de cualquier envergadura.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#7A7A7A" }}>
              Nuestro equipo de profesionales está disponible para asesorarle en la selección del
              equipo más adecuado según sus necesidades específicas.
            </p>
          </div>
          <div
            className="rounded-lg p-8 flex items-center justify-center"
            style={{ backgroundColor: "#F3F8F3", border: "1px solid #e0e0e0", minHeight: "280px" }}
          >
            <Image
              src="/images/logo.webp"
              alt="Hidra"
              width={280}
              height={100}
              className="w-auto h-20 object-contain"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
          >
            Nuestros valores
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-12 rounded" style={{ backgroundColor: "#53B94A" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col items-center text-center p-6 rounded-lg"
                style={{ backgroundColor: "#F3F8F3", border: "1px solid #e0e0e0" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#53B94A", color: "white" }}
                >
                  {v.icon}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm" style={{ color: "#7A7A7A" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: "#53B94A" }}
        >
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            ¿Necesita asesoría?
          </h2>
          <p className="text-white opacity-90 text-sm mb-6">
            Nuestro equipo está listo para ayudarle a encontrar la solución ideal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contacto"
              className="px-6 py-2.5 rounded font-semibold text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: "#53B94A" }}
            >
              Contáctenos
            </Link>
            <Link
              href="/productos"
              className="px-6 py-2.5 rounded font-semibold text-sm border border-white text-white transition-opacity hover:opacity-90"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
