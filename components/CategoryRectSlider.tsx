"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export interface CategoryItem {
  name: string;
  img: string;
  href: string;
}

interface Props {
  categories: CategoryItem[];
  autoPlayMs?: number;
}

export default function CategoryRectSlider({ categories, autoPlayMs = 5000 }: Props) {
  const [currentIndex, setCurrentPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % categories.length);
  }, [categories.length]);

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + categories.length) % categories.length);
  };

  useEffect(() => {
    if (paused || autoPlayMs <= 0) return;
    const interval = setInterval(nextSlide, autoPlayMs);
    return () => clearInterval(interval);
  }, [paused, autoPlayMs, nextSlide]);

  return (
    <div
      className="relative w-full h-full min-h-[400px] overflow-hidden rounded-xl group shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {categories.map((cat, idx) => (
          <div
            key={cat.name}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-[5000ms] ease-linear scale-100 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-12 left-8 right-8 text-white">
              <h3 
                className="text-3xl font-bold mb-4 transform transition-all duration-700 delay-300 translate-y-0 opacity-100"
                style={{ fontFamily: "var(--font-nunito)", fontWeight: 700 }}
              >
                {cat.name}
              </h3>
              <Link
                href={cat.href}
                className="inline-block px-6 py-2 bg-[#53B94A] text-white font-semibold rounded hover:bg-[#46a13d] transition-colors"
              >
                Explorar Categoría
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#53B94A] transition-all opacity-0 group-hover:opacity-100 z-30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#53B94A] transition-all opacity-0 group-hover:opacity-100 z-30"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentPage(idx); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-[#53B94A] w-8" : "bg-white/40 w-4 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
