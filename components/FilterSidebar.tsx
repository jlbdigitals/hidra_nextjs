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

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/productos?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => router.push("/productos");
  const hasActive = selectedCategoria || selectedMarca || selectedHp || selectedVoltaje;

  // Category nav — matches WooCommerce sidebar nav with Nunito 600
  const NavItem = ({ label, href, active }: { label: string; href: string; active: boolean }) => (
    <a
      href={href}
      className="block px-3 py-1.5 text-sm rounded transition-colors"
      style={{
        fontFamily: "var(--font-nunito)",
        fontWeight: 600,
        color: active ? "#53B94A" : "#7A7A7A",
        backgroundColor: active ? "#F3F8F3" : "transparent",
      }}
    >
      {label}
    </a>
  );

  return (
    <aside className="flex flex-col gap-5">
      {/* Category nav */}
      <div>
        <NavItem label="Todas" href="/productos" active={!selectedCategoria} />
        {topCategories.map((cat) => (
          <NavItem
            key={cat}
            label={cat}
            href={`/productos?categoria=${encodeURIComponent(cat)}`}
            active={selectedCategoria === cat}
          />
        ))}
      </div>

      {/* Filtrar por HP — matches WooCommerce shortcode widget */}
      {hpValues.length > 0 && (
        <div>
          <h3
            className="mb-2 px-1"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 600, fontSize: 18, color: "#7A7A7A" }}
          >
            Filtrar por HP
          </h3>
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

      {/* Filtrar por Voltaje */}
      {voltajes.length > 0 && (
        <div>
          <h3
            className="mb-2 px-1"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 600, fontSize: 18, color: "#7A7A7A" }}
          >
            Filtrar por Voltaje
          </h3>
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

      {/* Subcategory filter */}
      {subcategories.length > 0 && (
        <div>
          <h3
            className="mb-2 px-1"
            style={{ fontFamily: "Lato, sans-serif", fontWeight: 600, fontSize: 18, color: "#7A7A7A" }}
          >
            Marca / Serie
          </h3>
          {subcategories.map((sub) => (
            <NavItem
              key={sub}
              label={sub}
              href={`/productos?categoria=${encodeURIComponent(selectedCategoria)}&marca=${encodeURIComponent(sub)}`}
              active={selectedMarca === sub}
            />
          ))}
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

      {/* Unused props - needed to avoid TS error */}
      <div className="hidden">{categoryMenuItems.map((i) => i.label).join("")}</div>
    </aside>
  );
}
