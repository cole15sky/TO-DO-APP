import { db } from "~/server/db/dbservice";
import { todo } from "~/server/db/schema/todo";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, status } = body;

    if (!title || title.trim() === '') {
      throw createError({
        statusCode: 400,
        message: "Title is required and cannot be empty",
      });
    }
    const [newTodo] = await db.insert(todo).values({
      title,
      status: status || 'pending', 
    }).returning()

    console.log("Created Todo:", newTodo);
    return newTodo
  } catch (e) {
    console.error('Error creating todo:', e);

    throw createError({
      statusCode: 500,
      message: "Error creating todo",
      data: e,
    });
  }
 });



// import { db } from "~/server/db/dbservice";
// import { todo } from "~/server/db/schema/schema_todo";

// export default defineEventHandler(async (event) => {
//   try {
//     const body = await readBody(event);  
//     const { title, status } = body;  

//     if (!title || title.trim() === '') {
//       throw createError({
//         statusCode: 400,
//         message: "Title is required and cannot be empty",
//       });
//     }

//     const newTodo = await db.insert(todo).values({
//       title,
//       status: status || 'pending', 
//     });

//     console.log("Created Todo:", newTodo);
//     return newTodo;
//   } catch (e) {
//     console.error('Error creating todo:', e);

//     throw createError({
//       statusCode: 500,
//       message: "Error creating todo",
//       data: e,
//     });
//   }
// });
