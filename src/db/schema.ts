import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Define the users table schema
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  age: integer('age'),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
