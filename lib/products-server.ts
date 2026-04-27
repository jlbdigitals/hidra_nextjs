import { eq, or, ilike, sql } from "drizzle-orm";
import { getDb } from "./db";
import { products } from "./db/schema";
import type { Product } from "./products";

export type { Product } from "./products";
export { getProductImageSrc, getProductSlug, slugify, CATEGORY_ICONS, CATEGORY_DESCRIPTIONS } from "./products";

function toProduct(row: typeof products.$inferSelect): Product {
  return {
    id: row.id,
    nombre: row.nombre,
    descripcionCorta: row.descripcionCorta,
    descripcion: row.descripcion,
    precio: row.precio,
    topCategoria: row.topCategoria,
    deepCategoria: row.deepCategoria,
    marca: row.marca,
    imagen: row.imagen,
    imagenUrl: row.imagenUrl,
    localImage: row.localImage ?? undefined,
    fasico: row.fasico ?? undefined,
    publicado: row.publicado,
    destacado: row.destacado,
    hp: row.hp as string[],
    voltaje: row.voltaje as string[],
    categorias: row.categorias as string[],
  };
}

export async function getProducts(): Promise<Product[]> {
  const _db = getDb();
  if (!_db) return [];
  const rows = await _db.select().from(products);
  return rows.map(toProduct);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const _db = getDb();
  if (!_db) return undefined;
  const rows = await _db.select().from(products).where(eq(products.id, id));
  return rows[0] ? toProduct(rows[0]) : undefined;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const match = slug.match(/-(\d+)$/);
  if (match) return getProductById(parseInt(match[1]));
  const num = parseInt(slug);
  if (!isNaN(num)) return getProductById(num);
  return undefined;
}

export async function updateProduct(id: number, data: Partial<Omit<Product, "id">>): Promise<Product | null> {
  const update: Record<string, unknown> = {};
  if (data.nombre !== undefined)           update.nombre = data.nombre;
  if (data.descripcionCorta !== undefined) update.descripcionCorta = data.descripcionCorta;
  if (data.descripcion !== undefined)      update.descripcion = data.descripcion;
  if (data.precio !== undefined)           update.precio = data.precio;
  if (data.topCategoria !== undefined)     update.topCategoria = data.topCategoria;
  if (data.deepCategoria !== undefined)    update.deepCategoria = data.deepCategoria;
  if (data.marca !== undefined)            update.marca = data.marca;
  if (data.imagen !== undefined)           update.imagen = data.imagen;
  if (data.imagenUrl !== undefined)        update.imagenUrl = data.imagenUrl;
  if (data.localImage !== undefined)       update.localImage = data.localImage;
  if (data.fasico !== undefined)           update.fasico = data.fasico;
  if (data.publicado !== undefined)        update.publicado = data.publicado;
  if (data.destacado !== undefined)        update.destacado = data.destacado;
  if (data.hp !== undefined)               update.hp = data.hp;
  if (data.voltaje !== undefined)          update.voltaje = data.voltaje;
  if (data.categorias !== undefined)       update.categorias = data.categorias;

  const _db = getDb();
  if (!_db) return null;
  const rows = await _db.update(products).set(update).where(eq(products.id, id)).returning();
  return rows[0] ? toProduct(rows[0]) : null;
}

export async function getTopCategories(): Promise<string[]> {
  const all = await getProducts();
  return [...new Set(all.map((p) => p.topCategoria).filter(Boolean))].sort();
}

export async function getSubcategories(topCat: string): Promise<string[]> {
  const all = await getProducts();
  const subs = new Set<string>();
  for (const p of all)
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts[0] === topCat && parts.length >= 2) subs.add(parts[1]);
    }
  return [...subs].sort();
}

export async function getBrands(): Promise<string[]> {
  const all = await getProducts();
  const brands = new Set<string>();
  for (const p of all)
    for (const c of p.categorias) {
      const parts = c.split(" > ");
      if (parts.length >= 2) brands.add(parts[1]);
    }
  return [...brands].sort();
}

export async function getHpValues(): Promise<string[]> {
  const all = await getProducts();
  const vals = new Set<string>();
  for (const p of all) for (const h of p.hp) vals.add(h);
  return [...vals].sort((a, b) => parseFloat(a) - parseFloat(b));
}

export async function getVoltajes(): Promise<string[]> {
  const all = await getProducts();
  const vals = new Set<string>();
  for (const p of all) for (const v of p.voltaje) vals.add(v);
  return [...vals].sort();
}

export function isRealProduct(product: Product): boolean {
  if (product.marca === product.topCategoria) return false;
  if (product.precio > 0) return true;
  return product.categorias.some((c) => c.includes(" > "));
}

export async function filterProducts(params: {
  categoria?: string;
  marca?: string;
  hp?: string;
  voltaje?: string;
  q?: string;
}): Promise<Product[]> {
  let all = (await getProducts()).filter((p) => p.publicado && isRealProduct(p));
  if (params.categoria)
    all = all.filter((p) => p.categorias.some((c) => c.toLowerCase().includes(params.categoria!.toLowerCase())));
  if (params.marca)
    all = all.filter((p) => p.categorias.some((c) => c.toLowerCase().includes(params.marca!.toLowerCase())));
  if (params.hp)
    all = all.filter((p) => p.hp.includes(params.hp!));
  if (params.voltaje)
    all = all.filter((p) => p.voltaje.some((v) => v.includes(params.voltaje!.replace("V", ""))));
  if (params.q) {
    const q = params.q.toLowerCase();
    all = all.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcionCorta.toLowerCase().includes(q) ||
        p.categorias.some((c) => c.toLowerCase().includes(q))
    );
  }
  return all;
}
