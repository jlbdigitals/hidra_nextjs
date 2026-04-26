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
    <div className="w-full py-16 bg-[#F3F8F3] border-y border-[#e0e0e0]">
      <div className="max-w-[1140px] mx-auto px-4">
        <h2 
          className="text-center font-bold mb-10 uppercase"
          style={{ fontFamily: "var(--font-nunito-sans)", color: "#54595F", fontWeight: 700, fontSize: 24 }}
        >
          FILTROS AUTOMÁTICOS — MARCAS LÍDERES
        </h2>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex items-center justify-center gap-16 overflow-x-hidden whitespace-nowrap pb-4"
          >
            {/* Double the array for infinite scroll feel if needed, but here we just center if few */}
            {filterBrands.map((brand, idx) => (
              <Link
                key={`${brand.name}-${idx}`}
                href="/productos?categoria=Filtros"
                className="flex-shrink-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
              >
                <div className="relative w-40 h-24">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center mt-3 text-[11px] font-extrabold text-[#7A7A7A] uppercase tracking-wider">{brand.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
