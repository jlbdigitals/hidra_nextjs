// Server-only: all fs operations. Import this in server components and API routes.
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { Product } from './products'

// Re-export everything from the shared client-safe module
export type { Product } from './products'
export { getProductImageSrc, getProductSlug, slugify, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from './products'

const PRODUCTS_PATH = join(process.cwd(), 'public', 'products.json')
let _products: Product[] | null = null

export function getProducts(): Product[] {
  if (_products) return _products
  _products = JSON.parse(readFileSync(PRODUCTS_PATH, 'utf-8')) as Product[]
  return _products
}

export function updateProduct(id: number, data: Partial<Omit<Product, 'id'>>): Product | null {
  const raw = JSON.parse(readFileSync(PRODUCTS_PATH, 'utf-8')) as Product[]
  const idx = raw.findIndex((p) => p.id === id)
  if (idx === -1) return null
  raw[idx] = { ...raw[idx], ...data }
  writeFileSync(PRODUCTS_PATH, JSON.stringify(raw))
  _products = null
  return raw[idx]
}

export function getTopCategories(): string[] {
  const cats = new Set(getProducts().map((p) => p.topCategoria).filter(Boolean))
  return Array.from(cats).sort()
}

export function getSubcategories(topCat: string): string[] {
  const subs = new Set<string>()
  for (const p of getProducts()) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts[0] === topCat && parts.length >= 2) subs.add(parts[1])
    }
  }
  return Array.from(subs).sort()
}

export function getBrands(): string[] {
  const brands = new Set<string>()
  for (const p of getProducts()) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts.length >= 2) brands.add(parts[1])
    }
  }
  return Array.from(brands).sort()
}

export function getHpValues(): string[] {
  const vals = new Set<string>()
  for (const p of getProducts()) for (const h of p.hp) vals.add(h)
  return Array.from(vals).sort((a, b) => parseFloat(a) - parseFloat(b))
}

export function getVoltajes(): string[] {
  const vals = new Set<string>()
  for (const p of getProducts()) for (const v of p.voltaje) vals.add(v)
  return Array.from(vals).sort()
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  const match = slug.match(/-(\d+)$/)
  if (match) return getProductById(parseInt(match[1]))
  const num = parseInt(slug)
  if (!isNaN(num)) return getProductById(num)
  return undefined
}

export function isRealProduct(product: Product): boolean {
  if (product.marca === product.topCategoria) return false
  if (product.precio > 0) return true
  return product.categorias.some((c) => c.includes(' > '))
}

export function filterProducts(params: {
  categoria?: string
  marca?: string
  hp?: string
  voltaje?: string
  q?: string
}): Product[] {
  let products = getProducts().filter((p) => p.publicado && isRealProduct(p))
  if (params.categoria) {
    products = products.filter((p) =>
      p.categorias.some((c) => c.toLowerCase().includes(params.categoria!.toLowerCase()))
    )
  }
  if (params.marca) {
    products = products.filter((p) =>
      p.categorias.some((c) => c.toLowerCase().includes(params.marca!.toLowerCase()))
    )
  }
  if (params.hp) products = products.filter((p) => p.hp.includes(params.hp!))
  if (params.voltaje) {
    products = products.filter((p) =>
      p.voltaje.some((v) => v.includes(params.voltaje!.replace('V', '')))
    )
  }
  if (params.q) {
    const q = params.q.toLowerCase()
    products = products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcionCorta.toLowerCase().includes(q) ||
        p.categorias.some((c) => c.toLowerCase().includes(q))
    )
  }
  return products
}
