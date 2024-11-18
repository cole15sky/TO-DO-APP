import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql, InferInsertModel } from "drizzle-orm";

export const todo = sqliteTable("todo", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  created: text("created").default(sql`CURRENT_TIMESTAMP`),
  updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
});

export type TodoInsert = InferInsertModel<typeof todo>;  

