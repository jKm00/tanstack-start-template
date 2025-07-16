import { eq, desc } from "drizzle-orm";
import { db } from "~/features/db/lib";
import { todo, user } from "~/features/db/lib/schema";

async function getTodos(userId: string) {
  return db
    .select()
    .from(todo)
    .leftJoin(user, eq(todo.userId, user.id))
    .where(eq(todo.userId, userId))
    .orderBy(desc(todo.createdAt));
}

async function addTodo({
  title,
  description,
  userId,
}: {
  title: string;
  description?: string;
  userId: string;
}) {
  // Simulate 2 sec delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await db.insert(todo).values({
    title,
    description,
    userId,
  });
}

export const todoService = {
  getTodos,
  addTodo,
};
