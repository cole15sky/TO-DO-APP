import { db } from "../dbservice.js";
import { todo } from "../drizzle/schema_todo.ts";

export default defineEventHandler(async (event) => {
  try {
    const body = await useBody(event); 
    
    const { title, status } = body; 
    const newTodo = await db.insert(todo).values({
      title,
      status,
    }).returning().all(); 

    console.log("Created Todo:", newTodo);
    return newTodo;
  } catch (e) {
    console.error("Error creating todo:", e);
    throw createError(500, e);
  }
});
 