"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BrandSeries {
  brand: string;
  series: string[];
  count: number;
}

interface Props {
  categoria: string;
  brands: BrandSeries[];
  totalCount: number;
}

export default function BrandMenu({ categoria, brands, totalCount }: Props) {
  const searchParams = useSearchParams();
  const currentMarca = searchParams.get("marca") ?? "";
  const currentSerie = searchParams.get("serie") ?? "";
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenBrand(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const buildHref = (marca?: string, serie?: string) => {
    const params = new URLSearchParams();
    if (marca) params.set("marca", marca);
    if (serie) params.set("serie", serie);
    const qs = params.toString();
    return `/catalogo/${categoria}${qs ? `?${qs}` : ""}`;
  };

  const activeLabel = currentSerie
    ? `${currentMarca} · ${currentSerie}`
    : currentMarca || "Todas las marcas";

  return (
    <div ref={menuRef} className="mb-8">
      {/* Menu bar */}
      <div
        className="flex items-center gap-0 overflow-x-auto rounded-lg"
        style={{ border: "1px solid #e0e0e0", backgroundColor: "#fff" }}
      >
        {/* "Todas" tab */}
        <Link
          href={`/catalogo/${categoria}`}
          className="flex-shrink-0 px-5 py-3 text-sm font-semibold border-r border-[#e0e0e0] transition-colors whitespace-nowrap"
          style={
            !currentMarca
              ? { backgroundColor: "#53B94A", color: "white" }
              : { color: "#54595F" }
          }
        >
          Todas ({totalCount})
        </Link>

        {/* Brand tabs */}
        {brands.map((b) => {
          const isActive = currentMarca === b.brand;
          const isOpen = openBrand === b.brand;

          return (
            <div key={b.brand} className="relative flex-shrink-0 border-r border-[#e0e0e0] last:border-r-0">
              <button
                onClick={() => setOpenBrand(isOpen ? null : b.brand)}
                className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap w-full"
                style={
                  isActive
                    ? { backgroundColor: "#F3F8F3", color: "#53B94A" }
                    : { color: "#54595F" }
                }
              >
                {b.brand}
                <span className="text-xs font-normal opacity-60">({b.count})</span>
                {b.series.length > 0 && (
                  <svg
                    className="w-3 h-3 ml-0.5 transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Dropdown */}
              {isOpen && b.series.length > 0 && (
                <div
                  className="absolute top-full left-0 z-50 min-w-48 rounded-b-lg shadow-lg overflow-hidden"
                  style={{ border: "1px solid #e0e0e0", backgroundColor: "#fff", borderTop: "none" }}
                >
                  {/* Brand-level link (all series) */}
                  <Link
                    href={buildHref(b.brand)}
                    onClick={() => setOpenBrand(null)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold border-b border-[#f0f0f0] hover:bg-[#F3F8F3] transition-colors"
                    style={{ color: "#53B94A" }}
                  >
                    <span>Todas las {b.brand}</span>
                    <span className="text-xs font-normal text-[#7A7A7A]">{b.count}</span>
                  </Link>

                  {/* Series links */}
                  {b.series.map((serie) => {
                    const isActiveSerie = currentMarca === b.brand && currentSerie === serie;
                    return (
                      <Link
                        key={serie}
                        href={buildHref(b.brand, serie)}
                        onClick={() => setOpenBrand(null)}
                        className="flex items-center px-4 py-2.5 text-sm hover:bg-[#F3F8F3] transition-colors"
                        style={{ color: isActiveSerie ? "#53B94A" : "#54595F", fontWeight: isActiveSerie ? 600 : 400 }}
                      >
                        {isActiveSerie && (
                          <svg className="w-3 h-3 mr-2 flex-shrink-0" fill="none" stroke="#53B94A" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {serie}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active filter label */}
      {(currentMarca || currentSerie) && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-[#7A7A7A]">Filtrando por:</span>
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#F3F8F3", color: "#53B94A", border: "1px solid #53B94A" }}
          >
            {activeLabel}
            <Link
              href={`/catalogo/${categoria}`}
              className="hover:text-red-400 transition-colors font-bold"
              style={{ color: "#53B94A" }}
            >
              ×
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
