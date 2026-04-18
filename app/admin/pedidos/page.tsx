import { getQuotes } from '@/lib/quotes'
import { getOrders } from '@/lib/orders'
import AdminHeader from '../components/AdminHeader'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const QUOTE_STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pendiente: { bg: '#fef3cd', color: '#856404', label: 'Pendiente' },
  revisado:  { bg: '#cce5ff', color: '#004085', label: 'Revisado' },
  cerrado:   { bg: '#e3f5e1', color: '#2d6a4f', label: 'Cerrado' },
}

const ORDER_STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  inicializada: { bg: '#f4f6f8', color: '#6d7175', label: 'Inicializada' },
  autorizada:   { bg: '#e3f5e1', color: '#2d6a4f', label: 'Pagada' },
  anulada:      { bg: '#f8d7da', color: '#721c24', label: 'Anulada' },
  fallida:      { bg: '#dc3545', color: '#fff', label: 'Fallida' },
}

interface SearchParams {
  type?: 'cotizaciones' | 'ventas'
}

export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { type = 'cotizaciones' } = await searchParams
  
  const quotes = getQuotes()
  const orders = getOrders()

  const pendingQuotes = quotes.filter((q) => q.estado === 'pendiente').length
  const authorizedOrders = orders.filter((o) => o.estado === 'autorizada').length

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
    th: { padding: '10px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 600, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e1e3e5' },
    td: { padding: '13px 16px', borderBottom: '1px solid #f4f6f8', fontSize: 14, color: '#202223', verticalAlign: 'middle' as const },
    tab: (active: boolean) => ({
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      color: active ? '#53B94A' : '#6d7175',
      textDecoration: 'none',
      borderBottom: `3px solid ${active ? '#53B94A' : 'transparent'}`,
      transition: 'all 0.2s',
    })
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader 
        title={type === 'cotizaciones' ? 'Cotizaciones de Clientes' : 'Ventas Transbank'} 
        subtitle={type === 'cotizaciones' ? `${quotes.length} total · ${pendingQuotes} pendientes` : `${orders.length} total · ${authorizedOrders} pagadas`} 
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e1e3e5' }}>
        <Link href="/admin/pedidos?type=cotizaciones" style={S.tab(type === 'cotizaciones')}>
          📋 Cotizaciones ({pendingQuotes})
        </Link>
        <Link href="/admin/pedidos?type=ventas" style={S.tab(type === 'ventas')}>
          💰 Ventas Transbank ({authorizedOrders})
        </Link>
      </div>

      {/* Table */}
      <div style={S.card}>
        {type === 'cotizaciones' ? (
          /* QUOTES TABLE */
          quotes.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#6d7175' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Sin cotizaciones aún</p>
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
                  const st = QUOTE_STATUS_STYLES[q.estado] || QUOTE_STATUS_STYLES.pendiente
                  return (
                    <tr key={q.id}>
                      <td style={{ ...S.td, fontFamily: 'monospace', fontSize: 12, color: '#6d7175' }}>{q.id}</td>
                      <td style={{ ...S.td, fontSize: 13, color: '#6d7175' }}>
                        {new Date(q.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                      </td>
                      <td style={S.td}>
                        <div style={{ fontWeight: 600 }}>{q.nombre}</div>
                        {q.empresa && <div style={{ fontSize: 11, color: '#6d7175' }}>{q.empresa}</div>}
                      </td>
                      <td style={{ ...S.td, fontSize: 13 }}>{q.email}</td>
                      <td style={{ ...S.td, textAlign: 'center' }}>{q.productos.length}</td>
                      <td style={{ ...S.td, textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                      </td>
                      <td style={S.td}>
                        <Link href={`/admin/pedidos/${q.id}?type=quote`} style={{ color: '#53B94A', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Ver →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        ) : (
          /* ORDERS TABLE */
          orders.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#6d7175' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>💳</div>
              <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Sin ventas procesadas</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Orden</th>
                  <th style={S.th}>Fecha</th>
                  <th style={S.th}>Cliente</th>
                  <th style={S.th}>Total</th>
                  <th style={{ ...S.th, textAlign: 'center' }}>Estado</th>
                  <th style={S.th}></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const st = ORDER_STATUS_STYLES[o.estado] || ORDER_STATUS_STYLES.inicializada
                  return (
                    <tr key={o.id}>
                      <td style={{ ...S.td, fontFamily: 'monospace', fontSize: 12, color: '#6d7175' }}>{o.buyOrder}</td>
                      <td style={{ ...S.td, fontSize: 13, color: '#6d7175' }}>
                        {new Date(o.fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                      </td>
                      <td style={S.td}>
                        <div style={{ fontWeight: 600 }}>{o.nombre}</div>
                        <div style={{ fontSize: 11, color: '#6d7175' }}>{o.email}</div>
                      </td>
                      <td style={{ ...S.td, fontWeight: 700 }}>${o.total.toLocaleString('es-CL')}</td>
                      <td style={{ ...S.td, textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                      </td>
                      <td style={S.td}>
                        <Link href={`/admin/pedidos/${o.id}?type=order`} style={{ color: '#53B94A', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Ver →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  )
}
