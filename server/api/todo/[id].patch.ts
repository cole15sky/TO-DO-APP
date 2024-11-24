import { eq } from "drizzle-orm";
import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/todo";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const body = await readBody(event); 

   await db
   .update(todo)
   .set(body) 
   .where(eq(todo.id, id))

   return {
    message: "Todo updated successfully",  
  };
    
  }
);
