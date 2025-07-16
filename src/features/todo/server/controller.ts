import { createServerFn } from "@tanstack/react-start";
import { todoService } from "./service";
import { withAuth } from "~/features/auth/server/middleware";
import { todoValidation } from "../validations";

const getTodos = createServerFn({ method: "GET" })
  .middleware([withAuth])
  .handler(async ({ context }) => {
    return await todoService.getTodos(context.userId);
  });

const addTodo = createServerFn({
  method: "POST",
})
  .validator(todoValidation)
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
