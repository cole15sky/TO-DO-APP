import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/todo";

export default defineEventHandler(async (event) => {
  try {
    const todos = db.select().from(todo).all();
    console.log("Fetched Todos:", todos);

    return todos;
  } catch (e) {
    console.error("Error fetching todos:", e);

    throw createError({
      statusCode: 500,
      message: "Error fetching todos",
      data: e,
    });
  }
});

