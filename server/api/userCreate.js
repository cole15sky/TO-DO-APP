import { db } from "../dbservice";
import { users } from "../drizzle/schema.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    const { firstName, lastName, age } = body;

    const newUser = await db.insert(users).values({
      firstName,
      lastName,
      age,
    }).returning().all();

    console.log("Created User:", newUser);
    return newUser;
  } catch (e) {
    console.error("Error creating user:", e);
    throw createError(500, e);
  }
});
