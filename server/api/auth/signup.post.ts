import { db } from '~/server/db/dbservice';
import { user } from '~/server/db/schema/user';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'All fields are required.' });
  }

  const existingUser = await db.select().from(user).where(eq(user.email, email));
  if (existingUser.length) {
    throw createError({ statusCode: 400, message: 'Email is already registered.' });
  }

  const [newUser] = await db.insert(user).values({
    username: name,
    email,
    password, 
  }).returning();

  return { message: 'User registered successfully', user: newUser };
});
