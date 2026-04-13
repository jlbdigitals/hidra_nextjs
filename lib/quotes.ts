import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface QuoteProduct {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface Quote {
  id: string;
  fecha: string;
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  mensaje: string;
  productos: QuoteProduct[];
  estado: "pendiente" | "revisado" | "cerrado";
}

const DATA_PATH = join(process.cwd(), "data", "quotes.json");

export function getQuotes(): Quote[] {
  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Quote[];
  } catch {
    return [];
  }
}

export function getQuoteById(id: string): Quote | undefined {
  return getQuotes().find((q) => q.id === id);
}

export function saveQuote(quote: Omit<Quote, "id" | "fecha" | "estado">): Quote {
  const quotes = getQuotes();
  const newQuote: Quote = {
    ...quote,
    id: `Q${Date.now()}`,
    fecha: new Date().toISOString(),
    estado: "pendiente",
  };
  quotes.unshift(newQuote);
  writeFileSync(DATA_PATH, JSON.stringify(quotes, null, 2), "utf-8");
  return newQuote;
}

export function updateQuoteStatus(id: string, estado: Quote["estado"]): boolean {
  const quotes = getQuotes();
  const idx = quotes.findIndex((q) => q.id === id);
  if (idx === -1) return false;
  quotes[idx].estado = estado;
  writeFileSync(DATA_PATH, JSON.stringify(quotes, null, 2), "utf-8");
  return true;
}
