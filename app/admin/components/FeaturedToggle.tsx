"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  productId: number;
  initialValue: boolean;
}

export default function FeaturedToggle({ productId, initialValue }: Props) {
  const [isFeatured, setIsFeatured] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    if (loading) return;
    setLoading(true);
    
    const newValue = !isFeatured;
    
    try {
      // We need to fetch current product data to not overwrite other fields with nulls
      // But since we want to be surgical, we should ideally have a PATCH.
      // Given the current API is PUT and expects all fields, we will send only the toggle
      // and hope the API handles partial updates or we fetch first.
      
      // Let's assume we can send a partial update if we modified updateProduct in products-server.ts
      // Looking at products-server.ts: updateProduct(id: number, data: Partial<Omit<Product, 'id'>>)
      // Yes, it takes Partial!
      
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destacado: newValue }),
      });

      if (res.ok) {
        setIsFeatured(newValue);
        router.refresh();
      } else {
        alert("Error al actualizar el estado destacado");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      disabled={loading}
      style={{
        background: "none",
        border: "none",
        cursor: loading ? "wait" : "pointer",
        fontSize: "20px",
        padding: "4px",
        color: isFeatured ? "#FFD700" : "#E0E0E0",
        transition: "transform 0.2s ease, color 0.2s ease",
      }}
      className="hover:scale-125"
      title={isFeatured ? "Quitar de destacados" : "Marcar como destacado"}
    >
      {isFeatured ? "★" : "☆"}
    </button>
  );
}
