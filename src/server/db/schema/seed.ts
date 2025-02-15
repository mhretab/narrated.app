import { pgTable, text } from 'drizzle-orm/pg-core';

export const seed = pgTable('seed', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});
