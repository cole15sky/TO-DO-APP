import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/schema_todo.js";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };

    // if (!id) {
    //   throw createError({
    //     statusCode: 400,
    //     message: "Missing ID parameter",
    //   });
    // }

    const body = await readBody(event);  
    const { title, status } = body;  

    const updatedTodo = await db
      .update(todo)  
      .set({
        title,  
        status,  
      }) 
    return updatedTodo;  

  } catch (e) {
    console.error("Error updating todo:", e);  

    throw createError({
      statusCode: 500,  
      message: "Error updating todo",  
      data: e,  
    });
  }
});
