import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/todo";

export default defineEventHandler(async () => {
  await db.delete(todo);

  return {
    message: "All todos deleted successfully",
  };
});
