import { db } from "~/lib/db";
import { todo } from "~/lib/db/schema";

async function addTodo({ title, userId }: { title: string; userId: string }) {
  await db.insert(todo).values({
    title,
    userId,
  });
}

export const todoService = {
  addTodo,
};
