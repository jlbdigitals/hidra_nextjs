export interface Product {
  id: number
  nombre: string
  descripcionCorta: string
  descripcion: string
  precio: number
  categorias: string[]
  topCategoria: string
  deepCategoria: string
  marca: string
  hp: string[]
  voltaje: string[]
  imagen: string
  imagenUrl: string
  localImage?: string
  publicado: boolean
}

/** Returns the best available image path for a product */
export function getProductImageSrc(product: Product): string | null {
  if (product.localImage) return product.localImage
  if (product.imagenUrl) return product.imagenUrl.replace('http://hidra.local', '')
  return null
}

/** Generate a URL-safe slug from text */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')     // non-alphanum to dash
    .replace(/^-+|-+$/g, '')         // trim dashes
    .slice(0, 80)                    // limit length
}

/** Get the SEO-friendly slug for a product (name-id) */
export function getProductSlug(product: Product): string {
  return `${slugify(product.nombre)}-${product.id}`
}

/** Find a product by its slug (extracts the ID from the end) */
export function getProductBySlug(slug: string): Product | undefined {
  // Try to extract numeric ID from end of slug
  const match = slug.match(/-(\d+)$/)
  if (match) {
    return getProductById(parseInt(match[1]))
  }
  // Fallback: try slug as plain numeric ID
  const num = parseInt(slug)
  if (!isNaN(num)) return getProductById(num)
  return undefined
}

let _products: Product[] | null = null

export function getProducts(): Product[] {
  if (_products) return _products
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _products = require('../public/products.json') as Product[]
  return _products
}

export function getTopCategories(): string[] {
  const products = getProducts()
  const cats = new Set(products.map((p) => p.topCategoria).filter(Boolean))
  return Array.from(cats).sort()
}

export function getSubcategories(topCat: string): string[] {
  const products = getProducts()
  const subs = new Set<string>()
  for (const p of products) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts[0] === topCat && parts.length >= 2) {
        subs.add(parts[1])
      }
    }
  }
  return Array.from(subs).sort()
}

export function getBrands(): string[] {
  const products = getProducts()
  const brands = new Set<string>()
  for (const p of products) {
    for (const c of p.categorias) {
      const parts = c.split(' > ')
      if (parts.length >= 2) brands.add(parts[1])
    }
  }
  return Array.from(brands).sort()
}

export function getHpValues(): string[] {
  const products = getProducts()
  const vals = new Set<string>()
  for (const p of products) {
    for (const h of p.hp) vals.add(h)
  }
  return Array.from(vals).sort((a, b) => parseFloat(a) - parseFloat(b))
}

export function getVoltajes(): string[] {
  const products = getProducts()
  const vals = new Set<string>()
  for (const p of products) {
    for (const v of p.voltaje) vals.add(v)
  }
  return Array.from(vals).sort()
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

/**
 * Category-as-product entries imported from WooCommerce have no subcategory
 * path (no " > " in any categoria) and no price. Exclude them from listings.
 */
export function isRealProduct(product: Product): boolean {
  // Exclude placeholder products from WooCommerce where the brand name is the same as the category
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
      p.categorias.some((c) =>
        c.toLowerCase().includes(params.categoria!.toLowerCase())
      )
    )
  }
  if (params.marca) {
    products = products.filter((p) =>
      p.categorias.some((c) =>
        c.toLowerCase().includes(params.marca!.toLowerCase())
      )
    )
  }
  if (params.hp) {
    products = products.filter((p) => p.hp.includes(params.hp!))
  }
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

export const CATEGORY_ICONS: Record<string, string> = {
  Bombas: '💧',
  Control: '⚡',
  Filtros: '🔧',
  'Riego Agrícola': '🌱',
  'Riego Áreas Verdes': '🌿',
  'Tuberías y Fittings': '🔩',
  Válvulas: '🔄',
  'Entrega inmediata': '🚚',
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Bombas: 'Bombas centrífugas, sumergibles y periféricas de las mejores marcas italianas',
  Control: 'Programadores, sensores y tableros de control para sistemas de riego',
  Filtros: 'Filtros para sistemas de riego y tratamiento de agua',
  'Riego Agrícola': 'Aspersores, goteros, microaspersores y líneas de riego',
  'Riego Áreas Verdes': 'Emisores Hunter, K Rain y Rain Bird para áreas verdes',
  'Tuberías y Fittings': 'Tuberías y accesorios para instalaciones hidráulicas',
  Válvulas: 'Válvulas de control y paso para sistemas hidráulicos',
  'Entrega inmediata': 'Productos disponibles para entrega inmediata',
}
