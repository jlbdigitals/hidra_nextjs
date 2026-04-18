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
      className="relative w-full h-full min-h-[400px] overflow-hidden rounded-lg group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {categories.map((cat, idx) => (
          <Link
            key={cat.name}
            href={cat.href}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentPage(idx); }}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
