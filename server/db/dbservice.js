import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export const sqlite = new Database("data/data.db");
export const db = drizzle(sqlite);
