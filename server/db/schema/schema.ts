import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import type{ InferInsertModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  age: integer('age'),
});

export type User =InferInsertModel<typeof users>
