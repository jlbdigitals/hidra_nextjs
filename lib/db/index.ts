import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  
  // During build, avoid connecting
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }
  
  const client = postgres(connectionString, { prepare: false });
  return drizzle(client, { schema });
}
