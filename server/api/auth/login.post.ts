import { db } from '~/server/db/dbservice';
import { user } from '~/server/db/schema/user';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required.' });
  }

  const [existingUser] = await db.select().from(user).where(eq(user.email, email));

  // Check if user exists and password matches (no hashing used)
  if (!existingUser || existingUser.password !== password) {
    throw createError({ statusCode: 401, message: 'Invalid email or password.' });
  }

  return { message: 'Login successful', user: existingUser };
});
