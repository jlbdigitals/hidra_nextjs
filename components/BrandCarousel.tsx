"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const filterBrands = [
  { name: "YAMIT", img: "/uploads/filtros_yamit_2.jpg" },
  { name: "AZUD", img: "/uploads/filtros_azud_2.jpg" },
  { name: "YAMIT", img: "/uploads/filtros_yamit_2.jpg" },
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
    <div className="w-full py-12 bg-white border-t border-[#f0f0f0]">
      <div className="max-w-[1140px] mx-auto px-4">
        <h2 className="text-center font-bold mb-10 text-[#54595F] uppercase tracking-widest text-sm">
          FILTROS AUTOMÁTICOS
        </h2>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex items-center justify-center gap-12 overflow-x-hidden whitespace-nowrap pb-4"
          >
            {filterBrands.map((brand, idx) => (
              <Link
                key={`${brand.name}-${idx}`}
                href="/productos?categoria=Filtros"
                className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="relative w-48 h-32">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center mt-2 text-[10px] font-bold text-[#7A7A7A] uppercase tracking-tighter">{brand.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
