import { eq, desc, and } from "drizzle-orm";
import { db } from "~/features/db/lib";
import { todo, user } from "~/features/db/lib/schema";
import { Todo } from "../types";

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
  await db.insert(todo).values({
    title,
    description,
    userId,
  });
}

async function updateTodo({
  id,
  userId,
  values,
}: {
  id: string;
  userId: string;
  values: Pick<Todo, "title" | "description">;
}) {
  const existingTodo = await db.query.todo.findFirst({
    where: eq(todo.id, id),
  });

  if (!existingTodo) {
    throw new Error("Todo not found");
  }

  if (existingTodo.userId !== userId) {
    throw new Error("Unauthorized to update this todo");
  }

  await db
    .update(todo)
    .set({
      ...values,
    })
    .where(and(eq(todo.id, id), eq(todo.userId, userId)));
}

async function deleteTodo({ id, userId }: { id: string; userId: string }) {
  const existingTodo = await db.query.todo.findFirst({
    where: eq(todo.id, id),
  });

  if (!existingTodo) {
    throw new Error("Todo not found");
  }

  if (existingTodo.userId !== userId) {
    throw new Error("Unauthorized to delete this todo");
  }

  await db.delete(todo).where(and(eq(todo.id, id), eq(todo.userId, userId)));
}

export const todoService = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
