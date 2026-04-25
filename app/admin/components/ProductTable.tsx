"use client";

import { useState } from "react";
import Link from "next/link";
import FeaturedToggle from "./FeaturedToggle";
import QuickEditProduct from "./QuickEditProduct";
import BulkImageEditor from "./BulkImageEditor";

interface Product {
  id: number;
  nombre: string;
  localImage?: string;
  imagenUrl: string;
  precio: number;
  hp: string[];
  voltaje: string[];
  publicado: boolean;
  categorias: string[];
  topCategoria: string;
  deepCategoria: string;
  destacado: boolean;
}

interface Props {
  products: Product[];
  topCats: string[];
  q: string;
  categoria: string;
  currentPage: number;
  totalPages: number;
}

const PAGE_SIZE = 50;

export default function ProductTable({ products, topCats, q, categoria, currentPage, totalPages }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkEditorOpen, setBulkEditorOpen] = useState(false);

  function toggleAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setSelected(new Set(products.map((p) => p.id)));
    } else {
      setSelected(new Set());
    }
  }

  function toggle(id: number) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function buildUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams({ q, categoria, page: String(currentPage), ...overrides });
    return `/admin/productos?${p.toString()}`;
  }

  const S = {
    card: { backgroundColor: "#fff", borderRadius: 8, border: "1px solid #e1e3e5", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
    th: { padding: "10px 16px", textAlign: "left" as const, fontSize: 12, fontWeight: 600, color: "#6d7175", textTransform: "uppercase" as const, letterSpacing: "0.05em", backgroundColor: "#f9fafb", borderBottom: "1px solid #e1e3e5" },
    td: { padding: "12px 16px", borderBottom: "1px solid #f4f6f8", fontSize: 14, color: "#202223", verticalAlign: "middle" as const },
  };

  return (
    <>
      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        <Link href={buildUrl({ categoria: "", page: "1" })}
          style={{ padding: "5px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, textDecoration: "none",
            backgroundColor: !categoria ? "#53B94A" : "#f4f6f8",
            color: !categoria ? "#fff" : "#6d7175",
            border: `1px solid ${!categoria ? "#53B94A" : "#e1e3e5"}` }}>
          Todas
        </Link>
        {topCats.map((cat) => (
          <Link key={cat} href={buildUrl({ categoria: cat, page: "1" })}
            style={{ padding: "5px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, textDecoration: "none",
              backgroundColor: categoria === cat ? "#53B94A" : "#f4f6f8",
              color: categoria === cat ? "#fff" : "#6d7175",
              border: `1px solid ${categoria === cat ? "#53B94A" : "#e1e3e5"}` }}>
            {cat}
          </Link>
        ))}
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", backgroundColor: "#e8f5e9", borderRadius: 8, marginBottom: 16, border: "1px solid #a5d6a7" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#2d6a4f" }}>
            {selected.size} seleccionado{selected.size > 1 ? "s" : ""}
          </span>
          <button onClick={() => setBulkEditorOpen(true)}
            style={{ padding: "6px 14px", backgroundColor: "#53B94A", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Editar imagen
          </button>
          <button onClick={() => setSelected(new Set())}
            style={{ padding: "6px 14px", backgroundColor: "transparent", color: "#6d7175", border: "1px solid #c9cccf", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
            Deseleccionar
          </button>
        </div>
      )}

      {/* Table */}
      <div style={S.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: 40, textAlign: "center" as const }}>
                <input type="checkbox" checked={selected.size === products.length && products.length > 0} onChange={toggleAll} />
              </th>
              <th style={{ ...S.th, width: 40 }}>★</th>
              <th style={{ ...S.th, width: 60 }}>Img</th>
              <th style={S.th}>Nombre</th>
              <th style={S.th}>Categoría</th>
              <th style={S.th}>HP</th>
              <th style={S.th}>Voltaje</th>
              <th style={S.th}>Precio y Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ backgroundColor: selected.has(p.id) ? "#f0f8f0" : undefined }}>
                <td style={{ ...S.td, textAlign: "center", width: 40 }}>
                  <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)} />
                </td>
                <td style={{ ...S.td, textAlign: "center", width: 40 }}>
                  <FeaturedToggle productId={p.id} initialValue={p.destacado} />
                </td>
                <td style={S.td}>
                  <div style={{ width: 40, height: 40, backgroundColor: "#F3F8F3", border: "1px solid #e0e0e0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {(p.localImage || p.imagenUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.localImage || p.imagenUrl.replace("http://hidra.local", "")} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : <span style={{ fontSize: 18 }}>💧</span>}
                  </div>
                </td>
                <td style={S.td}>
                  <Link href={`/admin/productos/${p.id}`} style={{ color: "#53B94A", fontWeight: 600, textDecoration: "none", fontSize: 13 }}>
                    {p.nombre}
                  </Link>
                </td>
                <td style={{ ...S.td, color: "#6d7175", fontSize: 13 }}>{p.deepCategoria}</td>
                <td style={S.td}>
                  {Array.isArray(p.hp) ? p.hp.slice(0, 2).map((h) => (
                    <span key={h} style={{ display: "inline-block", marginRight: 4, padding: "2px 6px", backgroundColor: "#F3F8F3", color: "#53B94A", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{h}</span>
                  )) : null}
                </td>
                <td style={S.td}>
                  {Array.isArray(p.voltaje) ? p.voltaje.slice(0, 2).map((v) => (
                    <span key={v} style={{ display: "inline-block", marginRight: 4, padding: "2px 6px", backgroundColor: "#f4f6f8", color: "#6d7175", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{v.includes("V") ? v : `${v}V`}</span>
                  )) : null}
                </td>
                <td style={S.td}>
                  <QuickEditProduct
                    productId={p.id}
                    initialPrice={p.precio}
                    initialPublicado={p.publicado}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, padding: "16px", borderTop: "1px solid #e1e3e5" }}>
            {currentPage > 1 && (
              <Link href={buildUrl({ page: String(currentPage - 1) })} style={{ padding: "6px 12px", border: "1px solid #c9cccf", borderRadius: 6, color: "#202223", textDecoration: "none", fontSize: 13 }}>←</Link>
            )}
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((n) => (
              <Link key={n} href={buildUrl({ page: String(n) })}
                style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, textDecoration: "none",
                  backgroundColor: n === currentPage ? "#53B94A" : "transparent",
                  color: n === currentPage ? "#fff" : "#202223",
                  border: `1px solid ${n === currentPage ? "#53B94A" : "#c9cccf"}` }}>
                {n}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={buildUrl({ page: String(currentPage + 1) })} style={{ padding: "6px 12px", border: "1px solid #c9cccf", borderRadius: 6, color: "#202223", textDecoration: "none", fontSize: 13 }}>→</Link>
            )}
          </div>
        )}
      </div>

      {bulkEditorOpen && (
        <BulkImageEditor
          selectedIds={Array.from(selected)}
          onClose={() => setBulkEditorOpen(false)}
          onDone={() => { setBulkEditorOpen(false); setSelected(new Set()); }}
        />
      )}
    </>
  );
}