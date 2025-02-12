import { pgTable, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
});
