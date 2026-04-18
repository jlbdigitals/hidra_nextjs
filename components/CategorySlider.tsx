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

export default function CategorySlider({ categories, autoPlayMs = 3000 }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollRight = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = 200 + 24; // width + gap
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
    
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (paused || autoPlayMs <= 0) return;
    const interval = setInterval(scrollRight, autoPlayMs);
    return () => clearInterval(interval);
  }, [paused, autoPlayMs, scrollRight]);

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="flex flex-col items-center flex-shrink-0 group snap-center"
            style={{ width: 180 }}
          >
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-[#e0e0e0] group-hover:border-[#53B94A] transition-all duration-300 bg-white">
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span
              className="text-[#54595F] font-bold text-sm text-center group-hover:text-[#53B94A] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
