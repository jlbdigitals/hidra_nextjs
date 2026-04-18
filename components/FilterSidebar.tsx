"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  topCategories: string[];
  subcategories: string[];
  hpValues: string[];
  voltajes: string[];
  selectedCategoria: string;
  selectedMarca: string;
  selectedHp: string;
  selectedVoltaje: string;
  categoryMenuItems: { label: string; href: string }[];
}

export default function FilterSidebar({
  topCategories,
  subcategories,
  hpValues,
  voltajes,
  selectedCategoria,
  selectedMarca,
  selectedHp,
  selectedVoltaje,
  categoryMenuItems,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isBombas = selectedCategoria === "Bombas";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      // Use current path instead of hardcoded /productos
      router.push(`${window.location.pathname}?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => {
    router.push(window.location.pathname);
  };

  const hasActive = selectedMarca || (isBombas && (selectedHp || selectedVoltaje));

  const NavItem = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="block w-full text-left px-3 py-1.5 text-sm rounded transition-colors"
      style={{
        fontFamily: "var(--font-nunito)",
        fontWeight: 600,
        color: active ? "#53B94A" : "#7A7A7A",
        backgroundColor: active ? "#F3F8F3" : "transparent",
      }}
    >
      {label}
    </button>
  );

  return (
    <aside className="flex flex-col gap-6">
      {/* HP Filter — ONLY for Bombas */}
      {isBombas && hpValues.length > 0 && (
        <div>
          <h4
            className="mb-2 px-1 text-sm font-bold text-[#7A7A7A] uppercase tracking-wider"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Filtrar por HP
          </h4>
          <div className="flex flex-wrap gap-1.5 px-1">
            {hpValues.map((hp) => (
              <button
                key={hp}
                onClick={() => updateFilter("hp", selectedHp === hp ? "" : hp)}
                className="px-2.5 py-1 text-xs font-semibold rounded border transition-colors"
                style={{
                  backgroundColor: selectedHp === hp ? "#53B94A" : "#F3F8F3",
                  color: selectedHp === hp ? "#fff" : "#54595F",
                  borderColor: selectedHp === hp ? "#53B94A" : "#e0e0e0",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                {hp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voltaje Filter — ONLY for Bombas */}
      {isBombas && voltajes.length > 0 && (
        <div>
          <h4
            className="mb-2 px-1 text-sm font-bold text-[#7A7A7A] uppercase tracking-wider"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Voltaje
          </h4>
          <div className="flex flex-wrap gap-1.5 px-1">
            {voltajes.map((v) => (
              <button
                key={v}
                onClick={() => updateFilter("voltaje", selectedVoltaje === v ? "" : v)}
                className="px-2.5 py-1 text-xs font-semibold rounded border transition-colors"
                style={{
                  backgroundColor: selectedVoltaje === v ? "#53B94A" : "#F3F8F3",
                  color: selectedVoltaje === v ? "#fff" : "#54595F",
                  borderColor: selectedVoltaje === v ? "#53B94A" : "#e0e0e0",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                {v}V
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories / Brands */}
      {subcategories.length > 0 && (
        <div>
          <h4
            className="mb-2 px-1 text-sm font-bold text-[#7A7A7A] uppercase tracking-wider"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            {isBombas ? "Marca / Serie" : "Categorías"}
          </h4>
          <div className="flex flex-col gap-0.5">
            {subcategories.map((sub) => (
              <NavItem
                key={sub}
                label={sub}
                active={selectedMarca === sub}
                onClick={() => updateFilter("marca", selectedMarca === sub ? "" : sub)}
              />
            ))}
          </div>
        </div>
      )}

      {hasActive && (
        <button
          onClick={clearAll}
          className="text-xs text-[#7A7A7A] hover:text-red-500 px-1 text-left transition-colors font-semibold"
        >
          ✕ Limpiar filtros
        </button>
      )}
    </aside>
  );
}
