import { db } from "../dbservice";
import { users } from "../drizzle/schema.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    const { id } = body;

    const deletedUser = await db.delete(users)
      .where(users.id.equals(id))
      .returning().all();

    console.log("Deleted User:", deletedUser);
    return deletedUser;
  } catch (e) {
    console.error("Error deleting user:", e);
    throw createError(500, e);
  }
});
