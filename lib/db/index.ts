import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDb | null = null;

export function getDb(): DrizzleDb | null {
  if (process.env.NEXT_PHASE === "phase-production-build") return null;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("[db] DATABASE_URL no está configurada — la base de datos no estará disponible");
    return null;
  }

  if (!_db) {
    const client = postgres(connectionString, { prepare: false });
    _db = drizzle(client, { schema });
  }

  return _db;
}
