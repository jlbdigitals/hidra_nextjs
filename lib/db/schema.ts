import { pgTable, serial, text, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id:               serial("id").primaryKey(),
  nombre:           text("nombre").notNull().default(""),
  descripcionCorta: text("descripcion_corta").notNull().default(""),
  descripcion:      text("descripcion").notNull().default(""),
  precio:           integer("precio").notNull().default(0),
  topCategoria:     text("top_categoria").notNull().default(""),
  deepCategoria:    text("deep_categoria").notNull().default(""),
  marca:            text("marca").notNull().default(""),
  imagen:           text("imagen").notNull().default(""),
  imagenUrl:        text("imagen_url").notNull().default(""),
  localImage:       text("local_image"),
  fasico:           text("fasico"),
  publicado:        boolean("publicado").notNull().default(true),
  destacado:        boolean("destacado").notNull().default(false),
  hp:               jsonb("hp").notNull().default([]).$type<string[]>(),
  voltaje:          jsonb("voltaje").notNull().default([]).$type<string[]>(),
  categorias:       jsonb("categorias").notNull().default([]).$type<string[]>(),
});

export type ProductRow = typeof products.$inferSelect;
