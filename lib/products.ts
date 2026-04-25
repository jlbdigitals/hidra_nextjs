// Client-safe: types and pure functions only — no fs/path imports

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
  fasico?: string
  publicado: boolean
  destacado: boolean
}

/** Returns the best available image path for a product */
export function getProductImageSrc(product: Product): string | null {
  if (product.localImage) return product.localImage
  if (product.imagenUrl) return product.imagenUrl.replace('http://hidra.local', '')
  return null
}

/** Generate a URL-safe slug from text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Get the SEO-friendly slug for a product (name-id) */
export function getProductSlug(product: Product): string {
  return `${slugify(product.nombre)}-${product.id}`
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
