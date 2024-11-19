import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import type { InferInsertModel } from 'drizzle-orm'
import { todo } from './schema_todo'

const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  age: integer('age'),
})

export { todo, users }

export type User = InferInsertModel<typeof users>
