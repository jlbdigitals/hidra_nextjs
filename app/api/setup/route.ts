import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";

export async function POST() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL no configurada" }, { status: 503 });
  }

  try {
    // Create table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS products (
        id               SERIAL PRIMARY KEY,
        nombre           TEXT NOT NULL DEFAULT '',
        descripcion_corta TEXT NOT NULL DEFAULT '',
        descripcion      TEXT NOT NULL DEFAULT '',
        precio           INTEGER NOT NULL DEFAULT 0,
        top_categoria    TEXT NOT NULL DEFAULT '',
        deep_categoria   TEXT NOT NULL DEFAULT '',
        marca            TEXT NOT NULL DEFAULT '',
        imagen           TEXT NOT NULL DEFAULT '',
        imagen_url       TEXT NOT NULL DEFAULT '',
        local_image      TEXT,
        fasico           TEXT,
        publicado        BOOLEAN NOT NULL DEFAULT true,
        destacado        BOOLEAN NOT NULL DEFAULT false,
        hp               JSONB NOT NULL DEFAULT '[]',
        voltaje          JSONB NOT NULL DEFAULT '[]',
        categorias       JSONB NOT NULL DEFAULT '[]'
      )
    `);

    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(products);
    if (Number(count) > 0) {
      return NextResponse.json({ ok: true, message: `Ya hay ${count} productos. No se importó nada.` });
    }

    // Import from products.json
    const { readFileSync } = await import("fs");
    const { join } = await import("path");
    const raw: Record<string, unknown>[] = JSON.parse(
      readFileSync(join(process.cwd(), "public", "products.json"), "utf-8")
    );

    let inserted = 0;
    for (const p of raw) {
      await db.execute(sql`
        INSERT INTO products (
          id, nombre, descripcion_corta, descripcion, precio,
          top_categoria, deep_categoria, marca, imagen, imagen_url,
          local_image, fasico, publicado, destacado, hp, voltaje, categorias
        ) VALUES (
          ${p.id as number}, ${(p.nombre as string) ?? ''}, ${(p.descripcionCorta as string) ?? ''},
          ${(p.descripcion as string) ?? ''}, ${(p.precio as number) ?? 0},
          ${(p.topCategoria as string) ?? ''}, ${(p.deepCategoria as string) ?? ''},
          ${(p.marca as string) ?? ''}, ${(p.imagen as string) ?? ''}, ${(p.imagenUrl as string) ?? ''},
          ${(p.localImage as string) ?? null}, ${(p.fasico as string) ?? null},
          ${(p.publicado as boolean) ?? true}, ${(p.destacado as boolean) ?? false},
          ${JSON.stringify(p.hp ?? [])}::jsonb, ${JSON.stringify(p.voltaje ?? [])}::jsonb,
          ${JSON.stringify(p.categorias ?? [])}::jsonb
        )
        ON CONFLICT (id) DO NOTHING
      `);
      inserted++;
    }

    return NextResponse.json({ ok: true, inserted, total: raw.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
