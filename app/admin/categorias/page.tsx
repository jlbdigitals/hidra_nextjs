export const dynamic = 'force-dynamic'

import { getCategories, getCategoryProductCounts } from '@/lib/categories'
import AdminHeader from '../components/AdminHeader'
import CategoriasClient from './CategoriasClient'

export default function CategoriasPage() {
  const cats = getCategories()
  const counts = getCategoryProductCounts()
  const initialCats = cats.map((c) => ({ ...c, count: counts[c.id] ?? 0 }))

  return (
    <div style={{ padding: '0 32px 40px' }}>
      <AdminHeader title="Categorías de productos" subtitle={`${cats.length} categorías`} />
      <div style={{ marginTop: 24 }}>
        <CategoriasClient initialCats={initialCats} />
      </div>
    </div>
  )
}
