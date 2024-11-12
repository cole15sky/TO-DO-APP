import { db } from "../dbservice";
import { todo } from "../drizzle/schema_todo.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event); 
    const { id } = body;

    const deletedTodo = await db.delete(todo)
      .where(todo.id.equals(id))
      .returning().all();

    console.log("Deleted Todo:", deletedTodo);
    return deletedTodo;
  } catch (e) {
    console.error("Error deleting todo:", e);
    throw createError(500, e);
  }
});
