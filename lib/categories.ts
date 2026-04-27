import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { CATEGORY_ICONS, CATEGORY_DESCRIPTIONS, getProducts } from './products-server'

export interface Category {
  id: number
  name: string
  slug: string
  parentId: number | null
  description: string
  icon: string
}

const DATA_PATH = join(process.cwd(), 'data', 'categories.json')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

async function seedFromProducts(): Promise<Category[]> {
  const products = await getProducts()
  const cats: Category[] = []
  let nextId = 1

  // Level 1: topCategoria
  const tops = new Set(products.map((p) => p.topCategoria).filter(Boolean))
  const topMap = new Map<string, number>()
  for (const top of Array.from(tops).sort()) {
    const id = nextId++
    topMap.set(top, id)
    cats.push({
      id,
      name: top,
      slug: slugify(top),
      parentId: null,
      description: CATEGORY_DESCRIPTIONS[top] ?? '',
      icon: CATEGORY_ICONS[top] ?? '📦',
    })
  }

  // Level 2: brands (top > brand)
  const brandMap = new Map<string, number>()
  const brandKeys = new Set<string>()
  for (const p of products) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts.length >= 2) {
        brandKeys.add(parts[0] + ' > ' + parts[1])
      }
    }
  }
  for (const key of Array.from(brandKeys).sort()) {
    const [top, brand] = key.split(' > ')
    const parentId = topMap.get(top) ?? null
    if (parentId === null) continue
    const id = nextId++
    brandMap.set(key, id)
    cats.push({ id, name: brand, slug: slugify(brand), parentId, description: '', icon: '' })
  }

  // Level 3: series (top > brand > series)
  const seriesKeys = new Set<string>()
  for (const p of products) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts.length >= 3) {
        seriesKeys.add(parts[0] + ' > ' + parts[1] + ' > ' + parts[2])
      }
    }
  }
  for (const key of Array.from(seriesKeys).sort()) {
    const [top, brand, series] = key.split(' > ')
    const parentId = brandMap.get(top + ' > ' + brand) ?? null
    if (parentId === null) continue
    const id = nextId++
    cats.push({ id, name: series, slug: slugify(series), parentId, description: '', icon: '' })
  }

  return cats
}

export async function getCategories(): Promise<Category[]> {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    // fall through to seed
  }
  const seeded = await seedFromProducts()
  writeFileSync(DATA_PATH, JSON.stringify(seeded, null, 2))
  return seeded
}

function saveCategories(cats: Category[]) {
  writeFileSync(DATA_PATH, JSON.stringify(cats, null, 2))
}

export async function addCategory(data: Omit<Category, 'id'>): Promise<Category> {
  const cats = await getCategories()
  const id = cats.length > 0 ? Math.max(...cats.map((c) => c.id)) + 1 : 1
  const newCat: Category = { id, ...data }
  cats.push(newCat)
  saveCategories(cats)
  return newCat
}

export async function updateCategory(id: number, data: Partial<Omit<Category, 'id'>>): Promise<Category | null> {
  const cats = await getCategories()
  const idx = cats.findIndex((c) => c.id === id)
  if (idx === -1) return null
  cats[idx] = { ...cats[idx], ...data }
  saveCategories(cats)
  return cats[idx]
}

export async function deleteCategory(id: number): Promise<boolean> {
  const cats = await getCategories()
  // Re-parent children to grandparent
  const target = cats.find((c) => c.id === id)
  if (!target) return false
  const filtered = cats
    .map((c) => (c.parentId === id ? { ...c, parentId: target.parentId } : c))
    .filter((c) => c.id !== id)
  saveCategories(filtered)
  return true
}

export async function getCategoryProductCounts(): Promise<Record<number, number>> {
  const cats = await getCategories()
  const products = (await getProducts()).filter((p) => p.publicado)
  const counts: Record<number, number> = {}

  // Build full path for each category
  const catById = new Map(cats.map((c) => [c.id, c]))

  function getPath(cat: Category): string {
    const parts: string[] = [cat.name]
    let cur = cat
    while (cur.parentId !== null) {
      const parent = catById.get(cur.parentId)
      if (!parent) break
      parts.unshift(parent.name)
      cur = parent
    }
    return parts.join(' > ')
  }

  for (const cat of cats) {
    const path = getPath(cat)
    const depth = path.split(' > ').length
    let count = 0
    for (const p of products) {
      if (depth === 1) {
        if (p.topCategoria === cat.name) count++
      } else {
        if (p.categorias.some((c) => c === path || c.startsWith(path + ' > '))) count++
      }
    }
    counts[cat.id] = count
  }
  return counts
}
