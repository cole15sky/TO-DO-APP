import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql, InferInsertModel, InferSelectModel } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created: text("created").default(sql`CURRENT_TIMESTAMP`),
  updated: text("updated").default(sql`CURRENT_TIMESTAMP`),
  // isVerified: integer("is_verified",{mode:'boolean'}).default(false),
//   verificationToken: text("verification_token").notNull(), // Nullable token for verification
});

export type UserInsert = InferInsertModel<typeof user>;
export type UserSelect = InferSelectModel<typeof user>;
