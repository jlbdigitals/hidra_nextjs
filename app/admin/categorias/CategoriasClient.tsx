'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null
  description: string
  icon: string
  count: number
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

function buildParentOptions(cats: Category[], currentId?: number): { value: string; label: string; depth: number }[] {
  const childIds = new Set<number>()
  if (currentId) {
    // collect all descendants to avoid circular parents
    const collect = (id: number) => {
      cats.filter(c => c.parentId === id).forEach(c => { childIds.add(c.id); collect(c.id) })
    }
    collect(currentId)
    childIds.add(currentId)
  }

  const result: { value: string; label: string; depth: number }[] = []
  function walk(parentId: number | null, depth: number) {
    cats.filter(c => c.parentId === parentId && !childIds.has(c.id)).forEach(c => {
      result.push({ value: String(c.id), label: c.name, depth })
      walk(c.id, depth + 1)
    })
  }
  walk(null, 0)
  return result
}

function getAncestorPath(cat: Category, cats: Category[]): string {
  const parts: string[] = [cat.name]
  let cur = cat
  while (cur.parentId !== null) {
    const parent = cats.find(c => c.id === cur.parentId)
    if (!parent) break
    parts.unshift(parent.name)
    cur = parent
  }
  return parts.join(' › ')
}

const S = {
  card: { backgroundColor: '#fff', border: '1px solid #c3c4c7', borderRadius: 4, padding: '12px' } as React.CSSProperties,
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#1d2327', marginBottom: 4 } as React.CSSProperties,
  hint: { display: 'block', fontSize: 12, color: '#646970', marginTop: 3 } as React.CSSProperties,
  input: { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #8c8f94', borderRadius: 4, padding: '6px 8px', fontSize: 14, color: '#2c3338', outline: 'none' } as React.CSSProperties,
  textarea: { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #8c8f94', borderRadius: 4, padding: '6px 8px', fontSize: 14, color: '#2c3338', outline: 'none', resize: 'vertical' as const, minHeight: 60 } as React.CSSProperties,
  select: { width: '100%', boxSizing: 'border-box' as const, border: '1px solid #8c8f94', borderRadius: 4, padding: '6px 8px', fontSize: 14, color: '#2c3338', outline: 'none', backgroundColor: '#fff' } as React.CSSProperties,
  btn: { padding: '6px 12px', fontSize: 13, fontWeight: 600, border: '1px solid #2271b1', borderRadius: 3, background: '#2271b1', color: '#fff', cursor: 'pointer' } as React.CSSProperties,
  btnSm: { padding: '4px 8px', fontSize: 12, border: '1px solid #2271b1', borderRadius: 3, background: '#2271b1', color: '#fff', cursor: 'pointer' } as React.CSSProperties,
  btnDanger: { padding: '4px 8px', fontSize: 12, border: '1px solid #b32d2e', borderRadius: 3, background: '#fff', color: '#b32d2e', cursor: 'pointer' } as React.CSSProperties,
  btnGhost: { padding: '4px 8px', fontSize: 12, border: '1px solid #8c8f94', borderRadius: 3, background: '#fff', color: '#2c3338', cursor: 'pointer' } as React.CSSProperties,
  th: { padding: '8px 10px', textAlign: 'left' as const, fontSize: 13, fontWeight: 600, color: '#1d2327', borderBottom: '1px solid #c3c4c7', backgroundColor: '#f6f7f7' } as React.CSSProperties,
  td: { padding: '8px 10px', fontSize: 13, color: '#2c3338', borderBottom: '1px solid #f0f0f1', verticalAlign: 'top' as const } as React.CSSProperties,
}

interface AddFormProps {
  cats: Category[]
  onSaved: () => void
}

function AddForm({ cats, onSaved }: AddFormProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [parentId, setParentId] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [slugManual, setSlugManual] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(v: string) {
    setName(v)
    if (!slugManual) setSlug(slugify(v))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), slug: slug || slugify(name), parentId: parentId ? Number(parentId) : null, description, icon }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Error')
        return
      }
      setName(''); setSlug(''); setParentId(''); setDescription(''); setIcon(''); setSlugManual(false)
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  const parentOptions = buildParentOptions(cats)

  return (
    <div style={S.card}>
      <h2 style={{ fontSize: 14, fontWeight: 700, color: '#1d2327', margin: '0 0 16px', padding: '0 0 8px', borderBottom: '1px solid #c3c4c7' }}>Agregar nueva categoría</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={S.label}>Nombre</label>
          <input value={name} onChange={e => handleNameChange(e.target.value)} style={S.input} placeholder="Ej: Bombas de agua" required />
          <span style={S.hint}>El nombre es como aparece en el sitio.</span>
        </div>
        <div>
          <label style={S.label}>Slug</label>
          <input value={slug} onChange={e => { setSlugManual(true); setSlug(e.target.value) }} style={S.input} placeholder="ej: bombas-de-agua" />
          <span style={S.hint}>Identificador en la URL. Se genera automáticamente.</span>
        </div>
        <div>
          <label style={S.label}>Categoría padre</label>
          <select value={parentId} onChange={e => setParentId(e.target.value)} style={S.select}>
            <option value="">— Ninguna —</option>
            {parentOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {'\u00a0'.repeat(opt.depth * 4)}{opt.label}
              </option>
            ))}
          </select>
          <span style={S.hint}>Las categorías se pueden anidar en jerarquía.</span>
        </div>
        <div>
          <label style={S.label}>Descripción</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} style={S.textarea} />
          <span style={S.hint}>La descripción puede aparecer en algunas partes del tema.</span>
        </div>
        <div>
          <label style={S.label}>Icono (emoji)</label>
          <input value={icon} onChange={e => setIcon(e.target.value)} style={{ ...S.input, width: 80, textAlign: 'center', fontSize: 20 }} maxLength={4} placeholder="💧" />
        </div>
        {error && <p style={{ fontSize: 13, color: '#b32d2e', margin: 0 }}>{error}</p>}
        <div>
          <button type="submit" disabled={saving} style={S.btn}>
            {saving ? 'Agregando...' : 'Agregar categoría'}
          </button>
        </div>
      </form>
    </div>
  )
}

interface QuickEditProps {
  cat: Category
  cats: Category[]
  onSaved: () => void
  onCancel: () => void
}

function QuickEdit({ cat, cats, onSaved, onCancel }: QuickEditProps) {
  const [name, setName] = useState(cat.name)
  const [slug, setSlug] = useState(cat.slug)
  const [parentId, setParentId] = useState(cat.parentId ? String(cat.parentId) : '')
  const [description, setDescription] = useState(cat.description)
  const [icon, setIcon] = useState(cat.icon)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cat.id, name: name.trim(), slug, parentId: parentId ? Number(parentId) : null, description, icon }),
      })
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  const parentOptions = buildParentOptions(cats, cat.id)

  return (
    <tr style={{ backgroundColor: '#f0f6fc' }}>
      <td colSpan={5} style={{ padding: '12px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
          <div>
            <label style={{ ...S.label, fontSize: 12 }}>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} style={S.input} />
          </div>
          <div>
            <label style={{ ...S.label, fontSize: 12 }}>Slug</label>
            <input value={slug} onChange={e => setSlug(e.target.value)} style={S.input} />
          </div>
          <div>
            <label style={{ ...S.label, fontSize: 12 }}>Categoría padre</label>
            <select value={parentId} onChange={e => setParentId(e.target.value)} style={S.select}>
              <option value="">— Ninguna —</option>
              {parentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {'\u00a0'.repeat(opt.depth * 4)}{opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ ...S.label, fontSize: 12 }}>Icono</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} style={{ ...S.input, width: 60, textAlign: 'center', fontSize: 18 }} maxLength={4} />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={{ ...S.label, fontSize: 12 }}>Descripción</label>
          <input value={description} onChange={e => setDescription(e.target.value)} style={S.input} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={handleSave} disabled={saving} style={S.btnSm}>{saving ? 'Guardando...' : 'Actualizar'}</button>
          <button onClick={onCancel} style={S.btnGhost}>Cancelar</button>
        </div>
      </td>
    </tr>
  )
}

export default function CategoriasClient({ initialCats }: { initialCats: Category[] }) {
  const router = useRouter()
  const [cats, setCats] = useState<Category[]>(initialCats)
  const [quickEditId, setQuickEditId] = useState<number | null>(null)
  const [hoverId, setHoverId] = useState<number | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [bulkAction, setBulkAction] = useState('')
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      setCats(data)
      setQuickEditId(null)
      setSelected(new Set())
    } finally {
      setLoading(false)
    }
  }, [])

  async function handleDelete(id: number) {
    const cat = cats.find(c => c.id === id)
    if (!confirm(`¿Eliminar la categoría "${cat?.name}"? Los productos no se eliminarán.`)) return
    await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
    reload()
  }

  async function handleBulkApply() {
    if (bulkAction === 'delete' && selected.size > 0) {
      if (!confirm(`¿Eliminar ${selected.size} categoría(s)?`)) return
      await Promise.all(Array.from(selected).map(id => fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })))
      reload()
    }
  }

  function toggleSelect(id: number) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(prev => prev.size === cats.length ? new Set() : new Set(cats.map(c => c.id)))
  }

  // Render rows recursively
  function renderRows(parentId: number | null, depth: number): React.ReactNode[] {
    return cats.filter(c => c.parentId === parentId).flatMap(cat => {
      const isQuickEdit = quickEditId === cat.id
      const parentCat = cat.parentId ? cats.find(c => c.id === cat.parentId) : null
      const rows: React.ReactNode[] = []

      if (isQuickEdit) {
        rows.push(
          <QuickEdit key={`qe-${cat.id}`} cat={cat} cats={cats} onSaved={reload} onCancel={() => setQuickEditId(null)} />
        )
      } else {
        rows.push(
          <tr
            key={cat.id}
            onMouseEnter={() => setHoverId(cat.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{ backgroundColor: selected.has(cat.id) ? '#f0f6fc' : hoverId === cat.id ? '#f6f7f7' : '#fff' }}
          >
            <td style={{ ...S.td, width: 32 }}>
              <input type="checkbox" checked={selected.has(cat.id)} onChange={() => toggleSelect(cat.id)} />
            </td>
            <td style={S.td}>
              <div style={{ paddingLeft: depth * 20 }}>
                <span style={{ fontWeight: 600, color: '#1d2327' }}>
                  {depth > 0 && <span style={{ color: '#8c8f94', marginRight: 4 }}>{'— '.repeat(depth)}</span>}
                  {cat.icon ? `${cat.icon} ` : ''}{cat.name}
                </span>
                {hoverId === cat.id && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    <button onClick={() => setQuickEditId(cat.id)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}>
                      Edición rápida
                    </button>
                    <span style={{ color: '#c3c4c7' }}>|</span>
                    <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#b32d2e', cursor: 'pointer', textDecoration: 'underline' }}>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </td>
            <td style={{ ...S.td, color: '#646970' }}>{cat.description || <span style={{ color: '#c3c4c7' }}>—</span>}</td>
            <td style={{ ...S.td, color: '#646970', fontFamily: 'monospace', fontSize: 12 }}>{cat.slug}</td>
            <td style={{ ...S.td, color: '#646970' }}>{parentCat?.name || <span style={{ color: '#c3c4c7' }}>—</span>}</td>
            <td style={{ ...S.td, textAlign: 'center' as const }}>
              <span style={{ fontWeight: 600, color: cat.count > 0 ? '#2271b1' : '#c3c4c7' }}>{cat.count}</span>
            </td>
          </tr>
        )
      }

      rows.push(...renderRows(cat.id, depth + 1))
      return rows
    })
  }

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* Left: Add form */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <AddForm cats={cats} onSaved={reload} />
      </div>

      {/* Right: Table */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Bulk actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <select value={bulkAction} onChange={e => setBulkAction(e.target.value)} style={{ ...S.select, width: 'auto' }}>
            <option value="">Acciones en masa</option>
            <option value="delete">Eliminar</option>
          </select>
          <button onClick={handleBulkApply} style={S.btnGhost}>Aplicar</button>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#646970' }}>
            {loading ? 'Cargando...' : `${cats.length} categorías`}
          </span>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #c3c4c7', borderRadius: 4, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...S.th, width: 32 }}>
                  <input type="checkbox" checked={selected.size === cats.length && cats.length > 0} onChange={toggleAll} />
                </th>
                <th style={S.th}>Nombre</th>
                <th style={S.th}>Descripción</th>
                <th style={S.th}>Slug</th>
                <th style={S.th}>Padre</th>
                <th style={{ ...S.th, textAlign: 'center', width: 70 }}>Productos</th>
              </tr>
            </thead>
            <tbody>
              {renderRows(null, 0)}
              {cats.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ ...S.td, textAlign: 'center', color: '#646970', padding: '24px' }}>
                    No hay categorías todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Bottom bulk actions */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', borderTop: '1px solid #c3c4c7', backgroundColor: '#f6f7f7' }}>
            <select value={bulkAction} onChange={e => setBulkAction(e.target.value)} style={{ ...S.select, width: 'auto' }}>
              <option value="">Acciones en masa</option>
              <option value="delete">Eliminar</option>
            </select>
            <button onClick={handleBulkApply} style={S.btnGhost}>Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
