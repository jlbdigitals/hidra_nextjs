"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface BrandSeries {
  brand: string;
  series: string[];
}

interface Props {
  brands: BrandSeries[];
  hpValues: string[];
  voltajes: string[];
}

export default function BombasSidebar({ brands, hpValues, voltajes }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMarca = searchParams.get("marca") ?? "";
  const currentSerie = searchParams.get("serie") ?? "";
  const currentHp = searchParams.get("hp") ?? "";
  const currentVoltaje = searchParams.get("voltaje") ?? "";

  const [expandedBrand, setExpandedBrand] = useState<string | null>(currentMarca || null);

  const buildUrl = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      for (const [k, v] of Object.entries(overrides)) {
        if (v) params.set(k, v);
        else params.delete(k);
      }
      return `/bombas?${params.toString()}`;
    },
    [searchParams]
  );

  const setMarca = (marca: string) => {
    router.push(buildUrl({ marca, serie: "" }));
    setExpandedBrand(marca || null);
  };

  const setSerie = (serie: string) => {
    router.push(buildUrl({ serie }));
  };

  const toggleHp = (hp: string) => {
    router.push(buildUrl({ hp: currentHp === hp ? "" : hp }));
  };

  const toggleVoltaje = (v: string) => {
    router.push(buildUrl({ voltaje: currentVoltaje === v ? "" : v }));
  };

  const clearAll = () => router.push("/bombas");
  const hasActive = currentMarca || currentSerie || currentHp || currentVoltaje;

  return (
    <aside className="flex flex-col gap-6">
      {/* Brand / Series tree */}
      <div>
        <h3
          className="mb-2 px-1 text-[18px] font-semibold text-[#7A7A7A]"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Marca
        </h3>

        {/* All */}
        <button
          onClick={() => { setMarca(""); setExpandedBrand(null); }}
          className="block w-full text-left px-3 py-1.5 text-sm rounded transition-colors"
          style={{
            fontFamily: "var(--font-nunito)",
            fontWeight: 600,
            color: !currentMarca ? "#53B94A" : "#7A7A7A",
            backgroundColor: !currentMarca ? "#F3F8F3" : "transparent",
          }}
        >
          Todas las marcas
        </button>

        {brands.map((b) => {
          const isActive = currentMarca === b.brand;
          const isExpanded = expandedBrand === b.brand;

          return (
            <div key={b.brand}>
              <button
                onClick={() => {
                  setMarca(isActive ? "" : b.brand);
                  setExpandedBrand(isExpanded ? null : b.brand);
                }}
                className="flex items-center justify-between w-full px-3 py-1.5 text-sm rounded transition-colors"
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 600,
                  color: isActive ? "#53B94A" : "#7A7A7A",
                  backgroundColor: isActive ? "#F3F8F3" : "transparent",
                }}
              >
                <span>{b.brand}</span>
                {b.series.length > 0 && (
                  <svg
                    className="w-3 h-3 transition-transform flex-shrink-0"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {isExpanded && b.series.length > 0 && (
                <div className="ml-3 border-l border-[#e0e0e0] pl-2 mt-0.5 mb-1">
                  {b.series.map((serie) => {
                    const serieActive = isActive && currentSerie === serie;
                    return (
                      <button
                        key={serie}
                        onClick={() => setSerie(serieActive ? "" : serie)}
                        className="block w-full text-left px-2 py-1 text-xs rounded transition-colors"
                        style={{
                          fontFamily: "var(--font-nunito)",
                          fontWeight: serieActive ? 600 : 400,
                          color: serieActive ? "#53B94A" : "#7A7A7A",
                          backgroundColor: serieActive ? "#F3F8F3" : "transparent",
                        }}
                      >
                        {serie}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* HP filter */}
      {hpValues.length > 0 && (
        <div>
          <h3
            className="mb-2 px-1 text-[18px] font-semibold text-[#7A7A7A]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Filtrar por HP
          </h3>
          <div className="flex flex-wrap gap-1.5 px-1">
            {hpValues.map((hp) => (
              <button
                key={hp}
                onClick={() => toggleHp(hp)}
                className="px-2.5 py-1 text-xs font-semibold rounded border transition-colors"
                style={{
                  fontFamily: "var(--font-nunito)",
                  backgroundColor: currentHp === hp ? "#53B94A" : "#F3F8F3",
                  color: currentHp === hp ? "#fff" : "#54595F",
                  borderColor: currentHp === hp ? "#53B94A" : "#e0e0e0",
                }}
              >
                {hp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voltaje filter */}
      {voltajes.length > 0 && (
        <div>
          <h3
            className="mb-2 px-1 text-[18px] font-semibold text-[#7A7A7A]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Filtrar por Voltaje
          </h3>
          <div className="flex flex-wrap gap-1.5 px-1">
            {voltajes.map((v) => (
              <button
                key={v}
                onClick={() => toggleVoltaje(v)}
                className="px-2.5 py-1 text-xs font-semibold rounded border transition-colors"
                style={{
                  fontFamily: "var(--font-nunito)",
                  backgroundColor: currentVoltaje === v ? "#53B94A" : "#F3F8F3",
                  color: currentVoltaje === v ? "#fff" : "#54595F",
                  borderColor: currentVoltaje === v ? "#53B94A" : "#e0e0e0",
                }}
              >
                {v}V
              </button>
            ))}
          </div>
        </div>
      )}

      {hasActive && (
        <button
          onClick={clearAll}
          className="text-xs text-[#7A7A7A] hover:text-red-500 px-1 text-left transition-colors"
        >
          ✕ Limpiar filtros
        </button>
      )}
    </aside>
  );
}
