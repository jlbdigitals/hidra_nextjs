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

  const [expandedBrand, setExpandedBrand] = useState<string | null>(currentMarca || "Pedrollo");

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
          className="mb-3 px-1 text-[18px] font-bold text-[#54595F]"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Filtrar por Marca
        </h3>

        {/* All */}
        <button
          onClick={() => { setMarca(""); setExpandedBrand(null); }}
          className="block w-full text-left px-3 py-2 text-sm rounded transition-colors mb-1"
          style={{
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            color: !currentMarca ? "#53B94A" : "#7A7A7A",
            backgroundColor: !currentMarca ? "#F3F8F3" : "transparent",
            border: !currentMarca ? "1px solid #53B94A" : "1px solid transparent",
          }}
        >
          Todas las marcas
        </button>

        <div className="flex flex-col gap-1">
          {brands.map((b) => {
            const isMarcaActive = currentMarca === b.brand;
            const isExpanded = expandedBrand === b.brand;

            return (
              <div key={b.brand} className="flex flex-col">
                <div 
                  className="flex items-center w-full rounded transition-colors overflow-hidden"
                  style={{ 
                    backgroundColor: isMarcaActive ? "#F3F8F3" : "transparent",
                    border: isMarcaActive ? "1px solid #53B94A" : "1px solid transparent"
                  }}
                >
                  <button
                    onClick={() => {
                      setMarca(isMarcaActive && !currentSerie ? "" : b.brand);
                    }}
                    className="flex-1 text-left px-3 py-2 text-sm font-bold transition-colors"
                    style={{
                      fontFamily: "var(--font-nunito)",
                      color: isMarcaActive ? "#53B94A" : "#7A7A7A",
                    }}
                  >
                    {b.brand}
                  </button>
                  {b.series.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedBrand(isExpanded ? null : b.brand);
                      }}
                      className="px-3 py-2 hover:bg-[#F3F8F3] transition-colors border-l border-transparent hover:border-[#e0e0e0]"
                    >
                      <svg
                        className="w-4 h-4 transition-transform text-[#7A7A7A]"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {isExpanded && b.series.length > 0 && (
                  <div className="ml-4 border-l-2 border-[#53B94A]/20 pl-2 mt-1 mb-2 flex flex-col gap-1">
                    {b.series.map((serie) => {
                      const isSerieActive = isMarcaActive && currentSerie === serie;
                      return (
                        <button
                          key={serie}
                          onClick={() => setSerie(isSerieActive ? "" : serie)}
                          className="block w-full text-left px-2 py-1.5 text-xs rounded transition-colors"
                          style={{
                            fontFamily: "var(--font-nunito)",
                            fontWeight: isSerieActive ? 700 : 500,
                            color: isSerieActive ? "#53B94A" : "#7A7A7A",
                            backgroundColor: isSerieActive ? "#F3F8F3" : "transparent",
                          }}
                        >
                          • {serie}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
