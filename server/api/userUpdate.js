import { db } from "../dbservice";
import { users } from "../drizzle/schema.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    const { id, firstName, lastName, age } = body;

    const updatedUser = await db.update(users)
      .set({ firstName, lastName, age })
      .where(users.id.equals(id))
      .returning().all();

    console.log("Updated User:", updatedUser);
    return updatedUser;
  } catch (e) {
    console.error("Error updating user:", e);
    throw createError(500, e);
  }
});
