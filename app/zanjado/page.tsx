import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zanjado — Hidra",
  description:
    "Servicio de zanjado por metro lineal. Profundidad máxima 70 cm, ancho 16 cm. Incluye combustible y operador.",
};

const SERVICIOS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Riego tecnificado",
    desc: "Realizamos zanjas precisas para la instalación de sistemas de riego tecnificado, garantizando eficiencia en la distribución de agua para proyectos agrícolas y paisajísticos.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Canalizaciones eléctricas",
    desc: "Zanjas ideales para tendidos eléctricos subterráneos, asegurando protección y durabilidad en proyectos de infraestructura eléctrica.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    title: "Redes de gas",
    desc: "Zanjado especializado para la instalación segura de redes de gas subterráneas, cumpliendo con los más altos estándares de seguridad y precisión.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: "Instalación de fibra óptica",
    desc: "Ejecutamos zanjas optimizadas para el despliegue de fibra óptica, facilitando la conectividad de alta velocidad en áreas urbanas y rurales.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Tuberías sanitarias",
    desc: "Zanjado enfocado en la instalación de tuberías sanitarias, asegurando un flujo eficiente y libre de obstrucciones.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Cañerías de agua potable",
    desc: "Servicios de zanjado para la instalación de cañerías de agua potable, garantizando una red de abastecimiento confiable y duradera.",
  },
];

const VENTAJAS = [
  {
    title: "Equipos modernos y personal capacitado",
    desc: "Contamos con maquinaria de última generación y un equipo altamente capacitado para garantizar trabajos precisos y seguros.",
  },
  {
    title: "Eficiencia y rapidez",
    desc: "Optimizamos cada proceso para cumplir con los plazos establecidos, asegurando un servicio rápido sin comprometer la calidad.",
  },
  {
    title: "Nivel mínimo de daño",
    desc: "Minimizamos el impacto en terrenos y estructuras adyacentes, aplicando técnicas precisas que reducen al máximo los daños.",
  },
  {
    title: "Versatilidad incomparable",
    desc: "Nos adaptamos a diferentes tipos de proyectos, desde instalaciones eléctricas hasta tuberías sanitarias, con soluciones personalizadas.",
  },
];

const CONDITIONS = [
  "El cobro es por metro lineal de zanjado a un valor de $1.300 + IVA x mt.",
  "El cobro tendrá un mínimo de 100 mts diarios independiente de que se realicen menos metros lineales (siempre que el motivo sea por las condiciones propias del cliente o ajenas a nuestra responsabilidad).",
  "El precio incluye combustible y operador para la máquina.",
  "El valor de zanjado incluye el costo de traslado dentro de la provincia de Santiago más las comunas de Padre Hurtado, Peñaflor, Calera de tango, Pirque y Lampa. Traslados fuera de estas zonas se deben cotizar.",
  "La profundidad máxima de zanjado es de 70 cm y el ancho es fijo (no se puede regular) de 6\" (16 cm aprox.).",
  "La zanjadora NO se arrienda para que la opere el cliente directamente.",
];

export default function ZanjadoPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{ backgroundColor: "#53B94A" }}
      >
        <h1
          className="text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          Servicio de Zanjado
        </h1>
        <p className="text-white/90 text-base max-w-xl mx-auto mb-6">
          Canalización subterránea con zanjadora mecanizada. Profundidad máxima 70 cm · Ancho 16 cm.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-7 py-3 rounded font-semibold text-sm bg-white transition-opacity hover:opacity-90"
          style={{ color: "#53B94A" }}
        >
          Solicitar cotización
        </Link>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 py-12">

        {/* Conditions + machine photos — 2 col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-start">

          {/* Conditions */}
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              Condiciones del servicio
            </h2>
            <div className="h-1 w-12 rounded mb-5" style={{ backgroundColor: "#53B94A" }} />
            <ul className="flex flex-col gap-3">
              {CONDITIONS.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "#F3F8F3" }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="#53B94A" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#7A7A7A" }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Machine photos */}
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              Zanjadora Toro Dingo 323
            </h2>
            <div className="h-1 w-12 rounded mb-5" style={{ backgroundColor: "#53B94A" }} />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="overflow-hidden rounded-lg"
                  style={{ border: "1px solid #e0e0e0" }}
                >
                  <Image
                    src={`/images/zanjado/image${n}.jpg`}
                    alt={`Zanjadora ${n}`}
                    width={297}
                    height={208}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Por qué elegirnos */}
        <div className="mb-14">
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
          >
            ¿Por qué elegir nuestro servicio?
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-12 rounded" style={{ backgroundColor: "#53B94A" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENTAJAS.map((v, i) => (
              <div
                key={i}
                className="flex flex-col p-5 rounded-lg"
                style={{ backgroundColor: "#F3F8F3", border: "1px solid #e0e0e0" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold text-white text-sm"
                  style={{ backgroundColor: "#53B94A" }}
                >
                  {i + 1}
                </div>
                <h3
                  className="font-bold text-sm mb-2"
                  style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
                >
                  {v.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#7A7A7A" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Servicios */}
        <div className="mb-14">
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
          >
            Nuestros servicios
          </h2>
          <p className="text-center text-sm text-[#7A7A7A] mb-2">
            Canalización subterránea hasta 70 cm de profundidad y 16 cm de ancho.
          </p>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-12 rounded" style={{ backgroundColor: "#53B94A" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICIOS.map((s, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-lg bg-white"
                style={{ border: "1px solid #e0e0e0" }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#F3F8F3", color: "#53B94A" }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3
                    className="font-bold text-sm mb-1"
                    style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#7A7A7A" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div
          className="rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ backgroundColor: "#53B94A" }}
        >
          <div>
            <h3
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              ¿Necesita una cotización?
            </h3>
            <p className="text-white/85 text-sm">
              Contáctenos y le responderemos a la brevedad con precios y disponibilidad.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="tel:+56997107845"
              className="px-5 py-2.5 rounded font-semibold text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: "#53B94A" }}
            >
              +56 9 9710 7845
            </a>
            <Link
              href="/contacto"
              className="px-5 py-2.5 rounded font-semibold text-sm border border-white text-white transition-opacity hover:opacity-90"
            >
              Formulario de contacto
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
