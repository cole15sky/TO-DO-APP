import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/schema_todo.js";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };


    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw createError({
        statusCode: 400,
        message: "Invalid ID format, must be a number",
      });
    }

    const deletedTodo = await db
      .delete(todo)  
      .returning()  
      .all();  

      if (deletedTodo.length === 0) {
      throw createError({
        statusCode: 404,
        message: `Todo with ID ${numericId} not found`,
      });
    }

    return deletedTodo; 

  } catch (e) {
    console.error("Error deleting todo:", e);  

    throw createError({
      statusCode: 500,  
      message: "Error deleting todo",  

    });
  }
});
