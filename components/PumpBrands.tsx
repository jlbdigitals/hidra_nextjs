"use client";

import Image from "next/image";
import Link from "next/link";

const PUMP_BRANDS = [
  { name: "Hidra", img: "/images/logo.webp", href: "/bombas?marca=Hidra" },
  { name: "Pedrollo", img: "/uploads/bomba_pedrollo.webp", href: "/bombas?marca=Pedrollo" },
  { name: "Calpeda", img: "/uploads/bomba_calpeda.webp", href: "/bombas?marca=Calpeda" },
  { name: "Reggio", img: "/uploads/bomba_reggio.webp", href: "/bombas?marca=Reggio" },
  { name: "Bestflow", img: "/uploads/bomba_bestflow.webp", href: "/bombas?marca=Bestflow" },
];

export default function PumpBrands() {
  return (
    <section className="py-24 bg-[#f8fafc] border-y border-[#dee3ea]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">Socios Estratégicos</span>
          <h2 
            className="font-extrabold tracking-tight text-[#171c21]"
            style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            LÍDERES EN TECNOLOGÍA DE BOMBEO
          </h2>
          <div className="w-16 h-1 bg-[#006e0c] rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {PUMP_BRANDS.map((brand) => (
            <Link 
              key={brand.name}
              href={brand.href}
              className="group flex flex-col items-center gap-8 p-8 rounded-3xl bg-white border border-[#f1f5f9] transition-all duration-500 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2"
            >
              <div className="relative w-full h-24 flex items-center justify-center">
                <Image
                  src={brand.img}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="font-extrabold text-[#1e293b] text-lg tracking-tight transition-colors group-hover:text-[#006e0c]" style={{ fontFamily: "var(--font-manrope)" }}>
                  {brand.name}
                </span>
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Ver Productos
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
