import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { todoService } from "./service";
import { getServerSession } from "~/features/auth/utils";

const addTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const getTodos = createServerFn({ method: "GET" }).handler(async (ctx) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Unauthenticated");
  }

  return await todoService.getTodos(session.user.id);
});

const addTodo = createServerFn({
  method: "POST",
})
  .validator(addTodoSchema)
  .handler(async (ctx) => {
    const session = await getServerSession();

    if (!session) {
      throw new Error("Unauthenticated");
    }

    await todoService.addTodo({
      title: ctx.data.title,
      userId: session.user.id,
    });
  });

export const todoController = {
  getTodos,
  addTodo,
};
