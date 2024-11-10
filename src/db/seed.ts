
import { drizzle } from 'drizzle-orm/sqlite';
import { Database } from 'sqlite3'; 
import { users } from './db/schema';

const sqlite = new Database('./src/db/db.sqlite');
const db = drizzle(sqlite);

async function seedDatabase() {
  const userData = [
    { firstName: 'John', lastName: 'Doe', age: 25 },
    { firstName: 'Jane', lastName: 'Smith', age: 30 },
    { firstName: 'Alice', lastName: 'Johnson', age: 28 },
    { firstName: 'Bob', lastName: 'Brown', age: 35 },
    { firstName: 'Charlie', lastName: 'Davis', age: 22 },
  ];

  try {
    // Insert users into the database
    await db.insert(users).values(userData);
    console.log("Users added successfully!");
  } catch (error) {
    console.error("Error adding users:", error);
  }
}

// Run the seed function
seedDatabase();
