import { todo } from "../drizzle/schema_todo.ts";
import { db } from "../dbservice.js";


export default defineEventHandler(async (event) => {
  try {
    const resp = await db.select().from(todo).all();

    console.log("Search results - todo:", resp);

    return resp;
  } catch (e) {
    console.error("Error: ", e);
    throw createError(500, e);
  }
});


