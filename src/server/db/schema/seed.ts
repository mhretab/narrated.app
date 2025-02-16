import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const seed = pgTable('seed', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const seedSchema = createInsertSchema(seed);
export type SeedSchema = z.infer<typeof seedSchema>;
