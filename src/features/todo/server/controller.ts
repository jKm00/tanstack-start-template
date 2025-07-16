import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { todoService } from "./service";
import { withAuth } from "~/features/auth/server/middleware";

const addTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const getTodos = createServerFn({ method: "GET" })
  .middleware([withAuth])
  .handler(async ({ context }) => {
    return await todoService.getTodos(context.userId);
  });

const addTodo = createServerFn({
  method: "POST",
})
  .validator(addTodoSchema)
  .middleware([withAuth])
  .handler(async ({ context, data }) => {
    await todoService.addTodo({
      title: data.title,
      description: data.description,
      userId: context.userId,
    });
  });

export const todoController = {
  getTodos,
  addTodo,
};
