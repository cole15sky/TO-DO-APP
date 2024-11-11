import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./server/drizzle/schema.ts",   
  out: "./server/drizzle/migrations",      
  dbCredentials: {
    url: process.env.DATABASE_URL, 
  },    
  dialect: "sqlite",                   
  verbose: true,
  strict: true,
});
