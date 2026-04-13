export type CartItemTipo = "venta" | "cotizar"

export interface CartItem {
  id: number
  nombre: string
  imagen: string | null
  cantidad: number
  topCategoria: string
  tipo: CartItemTipo
  precio: number // 0 = sin precio / solo cotizar
}

export interface Cart {
  items: CartItem[]
}

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.cantidad, 0)
}

export function getCartSubtotal(cart: Cart): number {
  return cart.items
    .filter((i) => i.tipo === "venta" && i.precio > 0)
    .reduce((sum, i) => sum + i.precio * i.cantidad, 0)
}

/** Categories that can be sold (not just quoted) */
export const VENTA_CATEGORIAS = ["Bombas"]

export function isVenta(topCategoria: string): boolean {
  return VENTA_CATEGORIAS.includes(topCategoria)
}

export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("es-CL", { maximumFractionDigits: 0 })
}
