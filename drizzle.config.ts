import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./server/db/schema/",
  out: "./server/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  dialect: "sqlite",
  verbose: true,
  strict: true,
});
