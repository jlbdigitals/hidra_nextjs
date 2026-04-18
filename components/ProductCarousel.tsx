"use client";

import { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface Props {
  products: Product[];
}

export default function ProductCarousel({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;
      
      if (direction === "left") {
        scrollTo = scrollLeft - clientWidth;
        // Si llegamos al inicio y queremos ir a la izquierda, vamos al final
        if (scrollLeft <= 0) scrollTo = scrollWidth;
      } else {
        scrollTo = scrollLeft + clientWidth;
        // Si llegamos al final y queremos ir a la derecha, volvemos al inicio
        if (scrollLeft + clientWidth >= scrollWidth - 10) scrollTo = 0;
      }

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 4000); // Desplazar cada 4 segundos

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Botones de navegación - Visibles en hover */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-[#e0e0e0] p-2 rounded-full shadow-md hidden lg:flex items-center justify-center text-[#7A7A7A] hover:text-[#53B94A] transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch" 
        }}
      >
        {products.map((p) => (
          <div 
            key={p.id} 
            className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(25%-15px)] snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-[#e0e0e0] p-2 rounded-full shadow-md hidden lg:flex items-center justify-center text-[#7A7A7A] hover:text-[#53B94A] transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicador de progreso visual abajo */}
      <div className="flex justify-center gap-1.5 mt-2">
        {products.length > 4 && (
          <div className="h-1 w-24 bg-[#F3F8F3] rounded-full overflow-hidden">
            <div 
              className={`h-full bg-[#53B94A] transition-all duration-[4000ms] ease-linear ${isPaused ? 'w-0' : 'w-full'}`}
              key={isPaused ? 'paused' : 'playing'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
