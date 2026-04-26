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
    <aside className="flex flex-col gap-10">
      {/* Brand / Series tree */}
      <div>
        <h3
          className="mb-4 px-1 text-[11px] font-extrabold text-[#4059aa] uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Filtrar por Marca
        </h3>

        <div className="flex flex-col gap-2">
          {/* All */}
          <button
            onClick={() => { setMarca(""); setExpandedBrand(null); }}
            className={`block w-full text-left px-4 py-3 text-sm rounded-base transition-all font-bold border ${
              !currentMarca 
                ? "bg-[#f0fdf4] text-[#006e0c] border-[#dcfce7] shadow-sm" 
                : "bg-white text-[#475569] border-[#f1f5f9] hover:border-[#cbd5e1]"
            }`}
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Todas las marcas
          </button>

          <div className="flex flex-col gap-2">
            {brands.map((b) => {
              const isMarcaActive = currentMarca === b.brand;
              const isExpanded = expandedBrand === b.brand;

              return (
                <div key={b.brand} className="flex flex-col">
                  <div 
                    className={`flex items-center w-full rounded-base transition-all overflow-hidden border ${
                      isMarcaActive 
                        ? "bg-[#f0fdf4] text-[#006e0c] border-[#dcfce7] shadow-sm" 
                        : "bg-white text-[#475569] border-[#f1f5f9] hover:border-[#cbd5e1]"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setMarca(isMarcaActive && !currentSerie ? "" : b.brand);
                      }}
                      className="flex-1 text-left px-4 py-3 text-sm font-bold"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {b.brand}
                    </button>
                    {b.series.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedBrand(isExpanded ? null : b.brand);
                        }}
                        className={`px-4 py-3 border-l transition-colors ${
                          isMarcaActive ? "border-[#dcfce7] hover:bg-[#dcfce7]" : "border-[#f1f5f9] hover:bg-[#f8fafc]"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isMarcaActive ? "text-[#006e0c]" : "text-[#94a3b8]"}`}
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
                    <div className="ml-5 border-l-2 border-[#006e0c]/10 pl-3 mt-2 mb-2 flex flex-col gap-1">
                      {b.series.map((serie) => {
                        const isSerieActive = isMarcaActive && currentSerie === serie;
                        return (
                          <button
                            key={serie}
                            onClick={() => setSerie(isSerieActive ? "" : serie)}
                            className={`block w-full text-left px-3 py-2 text-xs rounded-base transition-all font-semibold ${
                              isSerieActive 
                                ? "text-[#006e0c] bg-[#f0fdf4]" 
                                : "text-[#64748b] hover:text-[#1e293b] hover:bg-[#f8fafc]"
                            }`}
                            style={{ fontFamily: "var(--font-manrope)" }}
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
        </div>
      </div>

      {/* HP filter */}
      {hpValues.length > 0 && (
        <div className="space-y-4">
          <h3
            className="px-1 text-[11px] font-extrabold text-[#4059aa] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filtrar por HP
          </h3>
          <div className="px-1">
            <select
              value={currentHp}
              onChange={(e) => toggleHp(e.target.value)}
              className="w-full px-4 py-3 text-sm font-bold rounded-base border bg-white text-[#1e293b] border-[#f1f5f9] hover:border-[#cbd5e1] focus:outline-none focus:border-[#006e0c] focus:ring-4 focus:ring-[#006e0c]/5 transition-all appearance-none cursor-pointer"
              style={{ 
                fontFamily: "var(--font-manrope)",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem'
              }}
            >
              <option value="">Cualquier Potencia</option>
              <option value="0-1">0 a 1 HP</option>
              <option value="1-10">1 a 10 HP</option>
              <option value="10-100">10 a 100 HP</option>
            </select>
          </div>
        </div>
      )}

      {/* Voltaje filter */}
      {voltajes.length > 0 && (
        <div className="space-y-4">
          <h3
            className="px-1 text-[11px] font-extrabold text-[#4059aa] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Filtrar por Voltaje
          </h3>
          <div className="px-1">
            <select
              value={currentVoltaje}
              onChange={(e) => toggleVoltaje(e.target.value)}
              className="w-full px-4 py-3 text-sm font-bold rounded-base border bg-white text-[#1e293b] border-[#f1f5f9] hover:border-[#cbd5e1] focus:outline-none focus:border-[#006e0c] focus:ring-4 focus:ring-[#006e0c]/5 transition-all appearance-none cursor-pointer"
              style={{ 
                fontFamily: "var(--font-manrope)",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem'
              }}
            >
              <option value="">Cualquier Voltaje</option>
              {voltajes.some(v => parseInt(v) < 380) && (
                <option value="monofasica">Monofásicas (220V)</option>
              )}
              {voltajes.some(v => parseInt(v) >= 380) && (
                <option value="trifasica">Trifásicas (380V+)</option>
              )}
            </select>
          </div>
        </div>
      )}

      {hasActive && (
        <button
          onClick={clearAll}
          className="flex items-center gap-2 text-[10px] font-extrabold text-[#94a3b8] hover:text-[#ef4444] px-1 text-left transition-all uppercase tracking-widest"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpiar filtros
        </button>
      )}
    </aside>
  );
}
