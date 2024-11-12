import { db } from "../dbservice";
import { todo } from "../drizzle/schema_todo.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event);
    const { id, title, status } = body; 

    const updatedTodo = await db.update(todo)
      .set({
        title,
        status,
        updated: sql`CURRENT_TIMESTAMP`, 
      })
      .where(todo.id.equals(id))
      .returning().all();

    console.log("Updated Todo:", updatedTodo);
    return updatedTodo;
  } catch (e) {
    console.error("Error updating todo:", e);
    throw createError(500, e);
  }
});
