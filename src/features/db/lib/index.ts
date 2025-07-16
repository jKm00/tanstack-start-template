import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({
  client: pool,
  schema,
});
