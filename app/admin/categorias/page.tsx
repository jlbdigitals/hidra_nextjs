export const dynamic = 'force-dynamic'

import { getCategories, getCategoryProductCounts } from '@/lib/categories'
import AdminHeader from '../components/AdminHeader'
import CategoriasClient from './CategoriasClient'

export default async function CategoriasPage() {
  const cats = await getCategories()
  const counts = await getCategoryProductCounts()
  const initialCats = cats.map((c) => ({ ...c, count: counts[c.id] ?? 0 }))

  return (
    <div style={{ padding: '40px 32px 40px' }}>
      <AdminHeader title="Categorías de productos" subtitle={`${cats.length} categorías`} />
      <div style={{ marginTop: 24 }}>
        <CategoriasClient initialCats={initialCats} />
      </div>
    </div>
  )
}
