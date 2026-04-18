"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  productId: number;
  initialPrice: number;
  initialPublicado: boolean;
}

export default function QuickEditProduct({ productId, initialPrice, initialPublicado }: Props) {
  const [price, setPrice] = useState(initialPrice);
  const [publicado, setPublicado] = useState(initialPublicado);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          precio: price,
          publicado: publicado 
        }),
      });

      if (res.ok) {
        setEditing(false);
        router.refresh();
      } else {
        alert("Error al guardar");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  if (!editing) {
    return (
      <div className="flex items-center gap-4 group">
        <div style={{ minWidth: "100px", fontWeight: 700, color: "#202223" }}>
          ${price.toLocaleString("es-CL")}
        </div>
        <div 
          style={{ 
            padding: '3px 10px', 
            borderRadius: 20, 
            fontSize: 12, 
            fontWeight: 600,
            backgroundColor: publicado ? '#e3f5e1' : '#fef3cd',
            color: publicado ? '#2d6a4f' : '#856404',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          title="Click para edición rápida"
        >
          {publicado ? 'Publicado' : 'Borrador'}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setEditing(true); }}
          className="opacity-0 group-hover:opacity-100 text-xs font-bold text-[#53B94A] hover:underline"
        >
          Editar
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border border-[#c9cccf] rounded px-2 py-1 text-sm w-24 outline-none focus:border-[#53B94A]"
        autoFocus
      />
      <select
        value={publicado ? "true" : "false"}
        onChange={(e) => setPublicado(e.target.value === "true")}
        className="border border-[#c9cccf] rounded px-2 py-1 text-sm outline-none focus:border-[#53B94A]"
      >
        <option value="true">Publicado</option>
        <option value="false">Borrador</option>
      </select>
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-[#53B94A] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#46a13e]"
      >
        {loading ? "..." : "✓"}
      </button>
      <button
        onClick={() => { setEditing(false); setPrice(initialPrice); setPublicado(initialPublicado); }}
        className="text-[#7A7A7A] hover:text-black px-1"
      >
        ✕
      </button>
    </div>
  );
}
