import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { todo } from "~/lib/db/schema";

async function getTodos(userId: string) {
  // Simulate a 2 sec delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.query.todo.findMany({
    where: eq(todo.userId, userId),
  });
}

async function addTodo({ title, userId }: { title: string; userId: string }) {
  await db.insert(todo).values({
    title,
    userId,
  });
}

export const todoService = {
  getTodos,
  addTodo,
};
