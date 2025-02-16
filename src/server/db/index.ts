import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import env from '@/lib/env';
import * as schema from '@/server/db/schema';

const connectionString = env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });

export type DB = typeof db;
