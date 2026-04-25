"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Props {
  selectedIds: number[];
  onClose: () => void;
  onDone: () => void;
  mode: 'image' | 'fasico';
}

export default function BulkImageEditor({ selectedIds, onClose, onDone, mode }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedFasico, setSelectedFasico] = useState<string>('');

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/products/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setFilename(data.filename);
        setPreview(data.path);
      } else {
        setMessage({ type: "error", text: data.error || "Error al subir" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setUploading(false);
    }
  }

  async function handleApplyImage() {
    if (!preview) return;
    setApplying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/products/batch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selectedIds, localImage: preview }),
      });
      const data = await res.json();
      if (data.results?.every((r: any) => r.success)) {
        setMessage({ type: "success", text: `Imagen aplicada a ${selectedIds.length} productos` });
        setTimeout(() => { onDone(); router.refresh(); }, 1200);
      } else {
        setMessage({ type: "error", text: "Error al aplicar imagen" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setApplying(false);
    }
  }

  async function handleRemoveImages() {
    setApplying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/products/batch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selectedIds, accion: "removeImage" }),
      });
      const data = await res.json();
      if (data.results?.every((r: any) => r.success)) {
        setMessage({ type: "success", text: `Imágenes eliminadas de ${selectedIds.length} productos` });
        setTimeout(() => { onDone(); router.refresh(); }, 1200);
      } else {
        setMessage({ type: "error", text: "Error al eliminar imágenes" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setApplying(false);
    }
  }

  async function handleApplyFasico() {
    if (!selectedFasico) return;
    setApplying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/products/batch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selectedIds, fasico: selectedFasico }),
      });
      const data = await res.json();
      if (data.results?.every((r: any) => r.success)) {
        setMessage({ type: "success", text: `${selectedFasico} aplicada a ${selectedIds.length} productos` });
        setTimeout(() => { onDone(); router.refresh(); }, 1200);
      } else {
        setMessage({ type: "error", text: "Error al aplicar" });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setApplying(false);
    }
  }

  if (mode === 'fasico') {
    return (
      <div style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
      }} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={{
          backgroundColor: "#fff", borderRadius: 12, padding: 32, width: 400, maxWidth: "95vw",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#202223", margin: 0 }}>
              Editar fáico ({selectedIds.length} productos)
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6d7175" }}>✕</button>
          </div>

          {message && (
            <div style={{
              padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 16,
              backgroundColor: message.type === "success" ? "#e3f5e1" : "#fff4f4",
              color: message.type === "success" ? "#2d6a4f" : "#b32d2e",
              border: `1px solid ${message.type === "success" ? "#b7dfb4" : "#fcc"}`
            }}>
              {message.text}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#6d7175", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
              Tipo de fáico
            </label>
            <div style={{ display: "flex", gap: 12 }}>
              {['Monofásica', 'Trifásica'].map((f) => (
                <button key={f} onClick={() => setSelectedFasico(f)}
                  style={{ flex: 1, padding: "14px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
                    border: `2px solid ${selectedFasico === f ? '#53B94A' : '#c9cccf'}`,
                    backgroundColor: selectedFasico === f ? '#e8f5e9' : '#fff',
                    color: selectedFasico === f ? '#2d6a4f' : '#202223' }}>
                  {f}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#6d7175" }}>
              Monofásica: 220V, 230V, 240V · Trifásica: 380V, 400V, 600V
            </div>
          </div>

          <button onClick={handleApplyFasico} disabled={!selectedFasico || applying}
            style={{ width: "100%", padding: "12px", backgroundColor: "#53B94A", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: selectedFasico && !applying ? "pointer" : "not-allowed", opacity: selectedFasico && !applying ? 1 : 0.6 }}>
            {applying ? "Aplicando..." : `Aplicar ${selectedFasico || 'fásico'}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        backgroundColor: "#fff", borderRadius: 12, padding: 32, width: 480, maxWidth: "95vw",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#202223", margin: 0 }}>
            Editar imagen ({selectedIds.length} productos)
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6d7175" }}>✕</button>
        </div>

        {message && (
          <div style={{
            padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 16,
            backgroundColor: message.type === "success" ? "#e3f5e1" : "#fff4f4",
            color: message.type === "success" ? "#2d6a4f" : "#b32d2e",
            border: `1px solid ${message.type === "success" ? "#b7dfb4" : "#fcc"}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#6d7175", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
            Subir imagen
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect}
              style={{ flex: 1, border: "1px solid #c9cccf", borderRadius: 6, padding: "8px 12px", fontSize: 14 }} />
            <button onClick={handleUpload} disabled={!fileInputRef.current?.files?.[0] || uploading}
              style={{ padding: "8px 16px", backgroundColor: "#53B94A", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              {uploading ? "..." : "Subir"}
            </button>
          </div>
        </div>

        {preview && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#6d7175", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
              Vista previa
            </label>
            <div style={{ width: "100%", aspectRatio: "1", backgroundColor: "#F3F8F3", border: "1px solid #e0e0e0", borderRadius: 6, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleApplyImage} disabled={!preview || applying}
            style={{ flex: 1, padding: "12px", backgroundColor: "#53B94A", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: preview && !applying ? "pointer" : "not-allowed", opacity: preview && !applying ? 1 : 0.6 }}>
            {applying ? "Aplicando..." : "Aplicar imagen"}
          </button>
          <button onClick={handleRemoveImages} disabled={applying}
            style={{ flex: 1, padding: "12px", backgroundColor: "#fff", color: "#b32d2e", border: "1px solid #b32d2e", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: applying ? "not-allowed" : "pointer", opacity: applying ? 0.6 : 1 }}>
            Eliminar imágenes
          </button>
        </div>
      </div>
    </div>
  );
}