"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const filterBrands = [
  { name: "YAMIT", img: "/uploads/filtros_yamit_2.webp" },
  { name: "AZUD", img: "/uploads/filtros_azud_2.webp" },
  { name: "AMIAD", img: "/uploads/filtros_amiad-1.webp" },
  { name: "JAVI", img: "/uploads/filtros_javi.webp" },
  { name: "RIVULIS", img: "/uploads/linea_rivulis.webp" },
];

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scroll = useCallback(() => {
    if (!scrollRef.current || paused) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 1) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 1, behavior: "auto" });
    }
  }, [paused]);

  useEffect(() => {
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [scroll]);

  return (
    <div className="w-full py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4059aa]">Sistemas de Filtración</span>
          <h2 
            className="font-extrabold tracking-tight text-[#171c21]"
            style={{ fontFamily: "var(--font-manrope)", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            FILTROS AUTOMÁTICOS — MARCAS LÍDERES
          </h2>
          <div className="w-12 h-1 bg-[#006e0c] rounded-full"></div>
        </div>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex items-center justify-center gap-20 overflow-x-hidden whitespace-nowrap pb-8"
          >
            {filterBrands.map((brand, idx) => (
              <Link
                key={`${brand.name}-${idx}`}
                href="/catalogo/filtros"
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-700 hover:scale-105"
              >
                <div className="relative w-44 h-20">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span className="h-0.5 w-0 group-hover:w-8 bg-[#006e0c] transition-all duration-500"></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
