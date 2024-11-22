import { eq } from "drizzle-orm";
import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/todo";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };

   await db
    .delete(todo)
    .where(eq(todo.id, id))

  return {
    message: "Todo deleted successfully",  
  };
});
