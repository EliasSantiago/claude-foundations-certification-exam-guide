import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// Neon serverless HTTP driver. The connection only fires on the first query,
// so a missing DATABASE_URL fails loudly at request time (not at build time).
const connectionString =
  process.env.DATABASE_URL ?? "postgresql://invalid:invalid@localhost/invalid";

if (!process.env.DATABASE_URL) {
  console.warn(
    "[db] DATABASE_URL is not set — database queries will fail until it is configured.",
  );
}

export const db = drizzle(neon(connectionString), { schema });
