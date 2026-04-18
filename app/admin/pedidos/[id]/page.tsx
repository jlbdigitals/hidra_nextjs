import { getQuoteById } from '@/lib/quotes'
import { getOrderById } from '@/lib/orders'
import AdminHeader from '../../components/AdminHeader'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuoteStatusUpdater from './QuoteStatusUpdater'

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

export default async function AdminPedidoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ type?: string }>
}) {
  const { id } = await params
  const { type = 'quote' } = await searchParams

  const isOrder = type === 'order'
  const data = isOrder ? getOrderById(id) : getQuoteById(id)
  
  if (!data) notFound()

  const st = isOrder 
    ? (ORDER_STATUS_STYLES[data.estado] || ORDER_STATUS_STYLES.inicializada)
    : (QUOTE_STATUS_STYLES[(data as any).estado] || QUOTE_STATUS_STYLES.pendiente)

  const S = {
    card: { backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e1e3e5', padding: 24, marginBottom: 20 },
    label: { fontSize: 12, fontWeight: 600 as const, color: '#6d7175', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 4, display: 'block' as const },
    value: { fontSize: 14, color: '#202223' },
    th: { padding: '10px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 600 as const, color: '#6d7175', backgroundColor: '#f9fafb', borderBottom: '1px solid #e1e3e5' },
    td: { padding: '12px 16px', borderBottom: '1px solid #f4f6f8', fontSize: 14, color: '#202223' },
  }

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader
        title={isOrder ? `Orden ${ (data as any).buyOrder }` : `Cotización ${data.id}`}
        actions={<Link href={`/admin/pedidos?type=${isOrder ? 'ventas' : 'cotizaciones'}`} style={{ padding: '8px 16px', border: '1px solid #c9cccf', borderRadius: 6, fontSize: 14, color: '#202223', textDecoration: 'none' }}>← Volver</Link>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div>
          {/* Client info */}
          <div style={S.card}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 20, marginTop: 0 }}>Datos del cliente</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><span style={S.label}>Nombre</span><span style={{ ...S.value, fontWeight: 600 }}>{data.nombre}</span></div>
              {(data as any).empresa && <div><span style={S.label}>Empresa</span><span style={S.value}>{(data as any).empresa}</span></div>}
              <div><span style={S.label}>Email</span>
                <a href={`mailto:${data.email}`} style={{ ...S.value, color: '#53B94A', textDecoration: 'none' }}>{data.email}</a>
              </div>
              <div><span style={S.label}>Teléfono</span>
                <a href={`tel:${data.telefono}`} style={{ ...S.value, color: '#53B94A', textDecoration: 'none' }}>{data.telefono}</a>
              </div>
              {isOrder && (
                <>
                  <div style={{ gridColumn: 'span 2' }}><span style={S.label}>Dirección de despacho</span><span style={S.value}>{(data as any).direccion}, {(data as any).comuna}, {(data as any).region}</span></div>
                </>
              )}
            </div>
            {(!isOrder && (data as any).mensaje) && (
              <div style={{ marginTop: 16 }}>
                <span style={S.label}>Mensaje / Requerimiento</span>
                <p style={{ ...S.value, margin: 0, backgroundColor: '#f9fafb', padding: 12, borderRadius: 6, border: '1px solid #e1e3e5', whiteSpace: 'pre-wrap' }}>{(data as any).mensaje}</p>
              </div>
            )}
          </div>

          {/* Items / Products */}
          <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e1e3e5' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', margin: 0 }}>
                {isOrder ? 'Productos Comprados' : 'Productos solicitados'}
              </h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Producto</th>
                  <th style={{ ...S.th, textAlign: 'center', width: 80 }}>Cant.</th>
                  {isOrder && <th style={{ ...S.th, textAlign: 'right' }}>Precio</th>}
                  {isOrder && <th style={{ ...S.th, textAlign: 'right' }}>Subtotal</th>}
                </tr>
              </thead>
              <tbody>
                {(isOrder ? (data as any).items : (data as any).productos).map((p: any) => (
                  <tr key={p.id}>
                    <td style={S.td}><span style={{ fontWeight: 600 }}>{p.nombre}</span></td>
                    <td style={{ ...S.td, textAlign: 'center' }}>{p.cantidad}</td>
                    {isOrder && <td style={{ ...S.td, textAlign: 'right' }}>${p.precio.toLocaleString('es-CL')}</td>}
                    {isOrder && <td style={{ ...S.td, textAlign: 'right', fontWeight: 700 }}>${(p.precio * p.cantidad).toLocaleString('es-CL')}</td>}
                  </tr>
                ))}
                {isOrder && (
                  <tr>
                    <td colSpan={3} style={{ ...S.td, textAlign: 'right', fontWeight: 800, fontSize: 16 }}>TOTAL PAGADO</td>
                    <td style={{ ...S.td, textAlign: 'right', fontWeight: 800, fontSize: 16, color: '#53B94A' }}>
                      ${(data as any).total.toLocaleString('es-CL')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isOrder && (data as any).paymentData && (
            <div style={S.card}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202223', marginBottom: 20, marginTop: 0 }}>Detalles de Transbank</h2>
              <pre style={{ backgroundColor: '#f9fafb', padding: 12, borderRadius: 6, fontSize: 11, color: '#6d7175', overflowX: 'auto' }}>
                {JSON.stringify((data as any).paymentData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Status */}
          <div style={S.card}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</h3>
            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, backgroundColor: st.bg, color: st.color, marginBottom: isOrder ? 0 : 16 }}>
              {st.label}
            </span>
            {!isOrder && <QuoteStatusUpdater quoteId={data.id} currentStatus={(data as any).estado} />}
          </div>

          {/* Quick actions */}
          <div style={S.card}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6d7175', marginBottom: 12, marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Acciones</h3>
            <a href={`mailto:${data.email}?subject=${isOrder ? 'Orden' : 'Cotización'} ${isOrder ? (data as any).buyOrder : data.id} - Hidra`}
              style={{ display: 'block', padding: '10px 16px', backgroundColor: '#53B94A', color: '#fff', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', marginBottom: 8 }}>
              Enviar Email
            </a>
            <a href={`tel:${data.telefono}`}
              style={{ display: 'block', padding: '10px 16px', border: '1px solid #c9cccf', color: '#202223', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none', textAlign: 'center' }}>
              Llamar: {data.telefono}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
