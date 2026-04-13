import { getQuotes } from '@/lib/quotes'
import AdminHeader from '../components/AdminHeader'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pendiente: { bg: '#fef3cd', color: '#856404', label: 'Pendiente' },
  revisado:  { bg: '#cce5ff', color: '#004085', label: 'Revisado' },
  cerrado:   { bg: '#e3f5e1', color: '#2d6a4f', label: 'Cerrado' },
}

export default async function AdminPedidosPage() {
  const quotes = getQuotes()

  const pendientes = quotes.filter((q) => q.estado === 'pendiente').length
  const total = quotes.length

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
    th: { padding: '10px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 600, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e1e3e5' },
    td: { padding: '13px 16px', borderBottom: '1px solid #f4f6f8', fontSize: 14, color: '#202223', verticalAlign: 'middle' as const },
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader title="Pedidos / Cotizaciones" subtitle={`${total} total · ${pendientes} pendientes`} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total cotizaciones', value: total, color: '#53B94A' },
          { label: 'Pendientes', value: pendientes, color: '#856404' },
          { label: 'Cerradas', value: quotes.filter((q) => q.estado === 'cerrado').length, color: '#2d6a4f' },
        ].map((s) => (
          <div key={s.label} style={{ backgroundColor: '#fff', borderRadius: 8, padding: '20px 24px', border: '1px solid #e1e3e5' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6d7175', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={S.card}>
        {quotes.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#6d7175' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Sin cotizaciones aún</p>
            <p style={{ fontSize: 14 }}>Cuando los clientes envíen una cotización, aparecerá aquí.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={S.th}>ID</th>
                <th style={S.th}>Fecha</th>
                <th style={S.th}>Cliente</th>
                <th style={S.th}>Email</th>
                <th style={{ ...S.th, textAlign: 'center' }}>Productos</th>
                <th style={{ ...S.th, textAlign: 'center' }}>Estado</th>
                <th style={S.th}></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const st = STATUS_STYLES[q.estado] || STATUS_STYLES.pendiente
                return (
                  <tr key={q.id}>
                    <td style={{ ...S.td, fontFamily: 'monospace', fontSize: 12, color: '#6d7175' }}>{q.id}</td>
                    <td style={{ ...S.td, fontSize: 13, color: '#6d7175' }}>
                      {new Date(q.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={S.td}>
                      <div style={{ fontWeight: 600 }}>{q.nombre}</div>
                      {q.empresa && <div style={{ fontSize: 12, color: '#6d7175' }}>{q.empresa}</div>}
                    </td>
                    <td style={{ ...S.td, fontSize: 13 }}>{q.email}</td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#53B94A' }}>{q.productos.length}</span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, backgroundColor: st.bg, color: st.color }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={S.td}>
                      <Link href={`/admin/pedidos/${q.id}`} style={{ color: '#53B94A', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Ver →</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
