"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  quoteId: string;
  currentStatus: "pendiente" | "revisado" | "cerrado";
}

const statusOptions = [
  { value: "pendiente", label: "Pendiente", color: "#f59e0b" },
  { value: "revisado", label: "Revisado", color: "#3b82f6" },
  { value: "cerrado", label: "Cerrado", color: "#6b7280" },
];

export default function QuoteStatusUpdater({ quoteId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: quoteId, estado: status }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Actualizar estado
      </p>
      <div className="flex flex-col gap-2">
        {statusOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="status"
              value={opt.value}
              checked={status === opt.value}
              onChange={() => setStatus(opt.value as typeof currentStatus)}
              className="accent-[#53B94A]"
            />
            <span
              className="text-sm font-medium"
              style={{ color: status === opt.value ? opt.color : "#9ca3af" }}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="mt-1 w-full py-2 px-4 rounded text-sm font-semibold text-white transition-colors disabled:opacity-50"
        style={{ backgroundColor: saved ? "#449c3d" : "#53B94A" }}
      >
        {loading ? "Guardando..." : saved ? "Guardado ✓" : "Guardar"}
      </button>
    </div>
  );
}
