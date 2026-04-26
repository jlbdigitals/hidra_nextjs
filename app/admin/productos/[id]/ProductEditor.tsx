'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  nombre: string
  descripcionCorta: string
  descripcion: string
  precio: number
  topCategoria: string
  deepCategoria: string
  marca: string
  hp: string[]
  voltaje: string[]
  localImage?: string
  imagenUrl: string
  publicado: boolean
  categorias: string[]
}

const S = {
  card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', padding: 24, marginBottom: 20 } as React.CSSProperties,
  label: { fontSize: 12, fontWeight: 600, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 6, display: 'block' } as React.CSSProperties,
  input: { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #c9cccf', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#202223', outline: 'none' } as React.CSSProperties,
  textarea: { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #c9cccf', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#202223', outline: 'none', resize: 'vertical' as const } as React.CSSProperties,
}

export default function ProductEditor({ product, productSlug }: { product: Product; productSlug: string }) {
  const router = useRouter()

  const [nombre, setNombre] = useState(product.nombre)
  const [descripcionCorta, setDescripcionCorta] = useState(product.descripcionCorta)
  const [descripcion, setDescripcion] = useState(product.descripcion)
  const [precio, setPrecio] = useState(String(product.precio || ''))
  const [publicado, setPublicado] = useState(product.publicado)
  const [topCategoria, setTopCategoria] = useState(product.topCategoria)
  const [deepCategoria, setDeepCategoria] = useState(product.deepCategoria)
  const [marca, setMarca] = useState(product.marca)
  const [hp, setHp] = useState(product.hp.join(', '))
  const [voltaje, setVoltaje] = useState(product.voltaje.join(', '))
  const [localImage, setLocalImage] = useState(product.localImage ?? '')
  const [imagenUrl, setImagenUrl] = useState(product.imagenUrl)

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewSrc = localImage || (imagenUrl ? imagenUrl.replace('http://hidra.local', '') : '')

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, descripcionCorta, descripcion,
          precio: parseFloat(precio) || 0,
          publicado, topCategoria, deepCategoria, marca,
          hp, voltaje, localImage, imagenUrl,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Error al guardar')
        return
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      router.refresh()
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/products/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        // Save immediately with new image path
        const saveRes = await fetch(`/api/admin/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre, descripcionCorta, descripcion,
            precio: parseFloat(precio) || 0,
            publicado, topCategoria, deepCategoria, marca,
            hp, voltaje, localImage: data.path, imagenUrl,
          }),
        })
        if (saveRes.ok) {
          setLocalImage(data.path)
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
          router.refresh()
        } else {
          setLocalImage(data.path)
          setError('Imagen subida pero no guardada — usa "Guardar cambios"')
        }
      } else {
        setError(data.error || 'Error al subir imagen')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleRemoveImage() {
    const fd = new FormData()
    fd.append('action', 'delete')
    fd.append('filename', localImage.split('/').pop() || '')
    await fetch('/api/admin/products/upload', { method: 'POST', body: fd })
    setLocalImage('')
    setImagenUrl('')
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
      {/* Left: main fields */}
      <div>
        {/* Nombre + precio + estado */}
        <div style={S.card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#202223', marginTop: 0, marginBottom: 20 }}>Información del producto</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} style={S.input} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={S.label}>Precio (CLP, sin IVA)</label>
              <input
                type="number"
                min="0"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                style={S.input}
                placeholder="0"
              />
            </div>
            <div>
              <label style={S.label}>Marca</label>
              <input value={marca} onChange={e => setMarca(e.target.value)} style={S.input} />
            </div>
            <div>
              <label style={S.label}>Estado</label>
              <select
                value={publicado ? 'publicado' : 'borrador'}
                onChange={e => setPublicado(e.target.value === 'publicado')}
                style={S.input}
              >
                <option value="publicado">Publicado</option>
                <option value="borrador">Borrador</option>
              </select>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div style={S.card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#202223', marginTop: 0, marginBottom: 20 }}>Descripciones</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Descripción corta</label>
            <textarea
              value={descripcionCorta}
              onChange={e => setDescripcionCorta(e.target.value)}
              style={{ ...S.textarea, minHeight: 80 }}
              rows={3}
            />
          </div>

          <div>
            <label style={S.label}>Descripción completa</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              style={{ ...S.textarea, minHeight: 120 }}
              rows={5}
            />
          </div>
        </div>

        {/* Specs */}
        <div style={S.card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#202223', marginTop: 0, marginBottom: 20 }}>Especificaciones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={S.label}>Potencia HP (separados por coma)</label>
              <input value={hp} onChange={e => setHp(e.target.value)} style={S.input} placeholder="Ej: 0.5, 1, 1.5" />
            </div>
            <div>
              <label style={S.label}>Voltaje (separados por coma)</label>
              <input value={voltaje} onChange={e => setVoltaje(e.target.value)} style={S.input} placeholder="Ej: 220, 380" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={S.card}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#202223', marginTop: 0, marginBottom: 20 }}>Categorías</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
            <div>
              <label style={S.label}>Categoría principal</label>
              <input value={topCategoria} onChange={e => setTopCategoria(e.target.value)} style={S.input} />
            </div>
            <div>
              <label style={S.label}>Categoría completa</label>
              <input value={deepCategoria} onChange={e => setDeepCategoria(e.target.value)} style={S.input} />
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6d7175' }}>
            Categorías WooCommerce (solo lectura):{' '}
            {product.categorias.map((c) => (
              <span key={c} style={{ display: 'inline-block', margin: '2px 4px 2px 0', padding: '2px 8px', backgroundColor: '#f4f6f8', borderRadius: 4, border: '1px solid #e1e3e5' }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div>
        {/* Save */}
        <div style={{ ...S.card, position: 'sticky', top: 80 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginTop: 0, marginBottom: 12 }}>PUBLICAR</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: '#6d7175' }}>Estado:</span>
            <span style={{ fontSize: 13, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
              backgroundColor: publicado ? '#e3f5e1' : '#fef3cd',
              color: publicado ? '#2d6a4f' : '#856404' }}>
              {publicado ? 'Publicado' : 'Borrador'}
            </span>
          </div>

          {error && (
            <div style={{ fontSize: 13, color: '#b32d2e', backgroundColor: '#fff4f4', border: '1px solid #fcc', borderRadius: 6, padding: '8px 12px', marginBottom: 12 }}>
              {error}
            </div>
          )}
          {saved && (
            <div style={{ fontSize: 13, color: '#2d6a4f', backgroundColor: '#e3f5e1', border: '1px solid #b7dfb4', borderRadius: 6, padding: '8px 12px', marginBottom: 12 }}>
              ✓ Guardado correctamente
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            style={{ width: '100%', padding: '10px', backgroundColor: saving ? '#7ed071' : '#53B94A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>

          <a
            href={`/productos/${productSlug}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'block', textAlign: 'center', marginTop: 10, fontSize: 13, color: '#53B94A', textDecoration: 'none' }}
          >
            Ver en el sitio ↗
          </a>
        </div>

        {/* Image */}
        <div style={S.card}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginTop: 0, marginBottom: 12 }}>IMAGEN</h3>

          <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#F3F8F3', border: '1px solid #e0e0e0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 12 }}>
            {previewSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }} />
            ) : (
              <span style={{ fontSize: 48, opacity: 0.2 }}>💧</span>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUploadImage} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
              style={{ flex: 1, padding: '8px', backgroundColor: '#53B94A', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {uploading ? '...' : 'Subir imagen'}
            </button>
            {localImage && (
              <button onClick={handleRemoveImage}
                style={{ padding: '8px 12px', backgroundColor: '#fff', color: '#b32d2e', border: '1px solid #b32d2e', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                ✕
              </button>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={S.label}>Ruta /uploads/...</label>
            <input value={localImage} onChange={e => setLocalImage(e.target.value)} style={S.input} placeholder="/uploads/foto.jpg" />
          </div>
          <div>
            <label style={S.label}>URL imagen externa</label>
            <input value={imagenUrl} onChange={e => setImagenUrl(e.target.value)} style={S.input} placeholder="https://..." />
          </div>
        </div>

        {/* Meta */}
        <div style={{ ...S.card, fontSize: 13, color: '#6d7175' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span>ID</span><span style={{ fontWeight: 600, color: '#202223' }}>#{product.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
