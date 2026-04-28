export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products-server";

export const metadata: Metadata = {
  title: "Catálogo — Hidra",
  description:
    "Catálogo completo de bombas, filtros, válvulas, sistemas de riego y tuberías.",
};

const CATEGORIES = [
  {
    slug: "bombas",
    label: "Bombas",
    topCategoria: "Bombas",
    img: "/images/categories/bombas.jpg",
    cta: "Ver todas las bombas",
    description: "Bombas centrífugas, sumergibles y periféricas",
    href: "/bombas",
  },
  {
    slug: "filtros",
    label: "Filtros",
    topCategoria: "Filtros",
    img: "/images/categories/filtros.jpg",
    cta: "Ver todos los filtros",
    description: "Filtros para sistemas de riego y tratamiento de agua",
  },
  {
    slug: "valvulas",
    label: "Válvulas",
    topCategoria: "Válvulas",
    img: "/images/categories/valvulas.jpg",
    cta: "Ver válvulas",
    description: "Válvulas de control y paso para sistemas hidráulicos",
  },
  {
    slug: "riego-agricola",
    label: "Riego Agrícola",
    topCategoria: "Riego Agrícola",
    img: "/images/categories/emisores-agricola.jpg",
    cta: "Ver Riego Agrícola",
    description: "Aspersores, goteros, microaspersores y líneas de riego",
  },
  {
    slug: "riego-areas-verdes",
    label: "Riego Áreas Verdes",
    topCategoria: "Riego Áreas Verdes",
    img: "/images/categories/emisores-areas-verdes.jpg",
    cta: "Ver Riego Áreas Verdes",
    description: "Emisores Hunter, K Rain y Rain Bird para áreas verdes",
  },
  {
    slug: "tuberias",
    label: "Tuberías y Fittings",
    topCategoria: "Tuberías y Fittings",
    img: "/images/categories/tuberias.jpg",
    cta: "Ver Tuberías y Fittings",
    description: "Tuberías y accesorios para instalaciones hidráulicas",
  },
  {
    slug: "control",
    label: "Control",
    topCategoria: "Control",
    img: "/images/categories/control.jpg",
    cta: "Ver todos los equipos",
    description: "Programadores, sensores y tableros de control",
  },
];

export default async function CatalogoPage() {
  const products = (await getProducts()).filter((p) => p.publicado);

  // Count per category
  const counts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    counts[cat.topCategoria] = products.filter(
      (p) => p.topCategoria === cat.topCategoria
    ).length;
  }

  return (
    <div style={{ backgroundColor: "#F4F7F3" }}>
      <div className="max-w-[1140px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#7A7A7A] mb-6">
          <Link href="/" className="hover:text-[#53B94A]">Inicio</Link>
          <span>/</span>
          <span className="font-semibold text-[#54595F]">Catálogo</span>
        </nav>

        {/* Category grid — 4:3 images, matching original proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href || `/catalogo/${cat.slug}`}
              className="group block overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
              style={{ border: "1px solid #e0e0e0" }}
            >
              {/* Image — aspect-[4/3] matches the 800×600 source images exactly */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Count badge */}
                <div
                  className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#53B94A" }}
                >
                  {counts[cat.topCategoria] ?? 0} productos
                </div>
              </div>

              {/* Card footer */}
              <div className="p-4">
                <h2
                  className="font-bold text-base mb-1"
                  style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
                >
                  {cat.label}
                </h2>
                <p className="text-xs text-[#7A7A7A] mb-3">{cat.description}</p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:underline"
                  style={{ color: "#53B94A" }}
                >
                  {cat.cta}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white"
          style={{ border: "1px solid #e0e0e0" }}
        >
          <div>
            <p
              className="font-bold text-base"
              style={{ fontFamily: "var(--font-nunito)", color: "#54595F" }}
            >
              ¿Busca un producto específico?
            </p>
            <p className="text-sm text-[#7A7A7A]">
              Use el buscador o filtre por categoría desde el catálogo completo.
            </p>
          </div>
          <Link
            href="/productos"
            className="flex-shrink-0 px-5 py-2.5 rounded font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#53B94A" }}
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </div>
  );
}
