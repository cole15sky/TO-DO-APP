import { db } from "../dbservice";
import { users } from "../drizzle/schema.ts";

export default defineEventHandler(async (event) => {
  try {
    const usersList = await db.select().from(users).all();
    console.log("Users:", usersList);
    return usersList;
  } catch (e) {
    console.error("Error fetching users:", e);
    throw createError(500, e);
  }
});
