import { createServerFn } from "@tanstack/react-start";
import { todoService } from "./service";
import { withAuth } from "~/features/auth/server/middleware";
import { addTodoValidation, deleteTodoValidation, editTodoValidation } from "../validations";

const getTodos = createServerFn({ method: "GET" })
  .middleware([withAuth])
  .handler(async ({ context }) => {
    return await todoService.getTodos(context.userId);
  });

const addTodo = createServerFn({
  method: "POST",
})
  .validator(addTodoValidation)
  .middleware([withAuth])
  .handler(async ({ context, data }) => {
    await todoService.addTodo({
      title: data.title,
      description: data.description,
      userId: context.userId,
    });
  });

const updateTodo = createServerFn({
  method: "POST",
})
  .validator(editTodoValidation)
  .middleware([withAuth])
  .handler(async ({ context, data }) => {
    await todoService.updateTodo({
      id: data.id,
      userId: context.userId,
      values: {
        title: data.title,
        description: data.description || null,
      },
    });
  });

const deleteTodo = createServerFn({
  method: "POST",
})
  .validator(deleteTodoValidation)
  .middleware([withAuth])
  .handler(async ({ context, data }) => {
    await todoService.deleteTodo({
      id: data.id,
      userId: context.userId,
    });
  });

export const todoController = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
