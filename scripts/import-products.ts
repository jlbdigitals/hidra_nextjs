import postgres from "postgres";
import { readFileSync } from "fs";
import { join } from "path";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL no configurado");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

async function main() {
  const raw = JSON.parse(readFileSync(join(process.cwd(), "public", "products.json"), "utf-8"));
  console.log(`Importando ${raw.length} productos...`);

  await sql`
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
  `;

  let inserted = 0;
  for (const p of raw) {
    await sql`
      INSERT INTO products (
        id, nombre, descripcion_corta, descripcion, precio,
        top_categoria, deep_categoria, marca, imagen, imagen_url,
        local_image, fasico, publicado, destacado, hp, voltaje, categorias
      ) VALUES (
        ${p.id}, ${p.nombre ?? ''}, ${p.descripcionCorta ?? ''}, ${p.descripcion ?? ''},
        ${p.precio ?? 0}, ${p.topCategoria ?? ''}, ${p.deepCategoria ?? ''},
        ${p.marca ?? ''}, ${p.imagen ?? ''}, ${p.imagenUrl ?? ''},
        ${p.localImage ?? null}, ${p.fasico ?? null},
        ${p.publicado ?? true}, ${p.destacado ?? false},
        ${JSON.stringify(p.hp ?? [])}, ${JSON.stringify(p.voltaje ?? [])},
        ${JSON.stringify(p.categorias ?? [])}
      )
      ON CONFLICT (id) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        descripcion_corta = EXCLUDED.descripcion_corta,
        descripcion = EXCLUDED.descripcion,
        precio = EXCLUDED.precio,
        top_categoria = EXCLUDED.top_categoria,
        deep_categoria = EXCLUDED.deep_categoria,
        marca = EXCLUDED.marca,
        imagen = EXCLUDED.imagen,
        imagen_url = EXCLUDED.imagen_url,
        local_image = EXCLUDED.local_image,
        fasico = EXCLUDED.fasico,
        publicado = EXCLUDED.publicado,
        destacado = EXCLUDED.destacado,
        hp = EXCLUDED.hp,
        voltaje = EXCLUDED.voltaje,
        categorias = EXCLUDED.categorias
    `;
    inserted++;
    if (inserted % 100 === 0) console.log(`  ${inserted}/${raw.length}...`);
  }

  console.log(`✅ ${inserted} productos importados`);
  await sql.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
