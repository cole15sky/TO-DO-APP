import { sqliteTable, integer, text} from "drizzle-orm/sqlite-core";
import { sql, InferInsertModel, InferSelectModel } from "drizzle-orm";


export const user = sqliteTable("user", {
  id: integer("id").primaryKey(), 
  username: text("username").notNull().unique(), 
  email: text("email").notNull().unique(), 
  password: text("password").notNull(), 
  created: text("created").default(sql`CURRENT_TIMESTAMP`),
  updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
});

export type UserInsert = InferInsertModel<typeof user>; 
export type UserSelect = InferSelectModel<typeof user>; 
