import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
// import env from "@/lib/env";
import * as schema from '@/server/db/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL env var is required');
}
const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export type DB = typeof db;
