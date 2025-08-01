import { createServerFn, json } from "@tanstack/react-start";
import { todoService } from "./service";
import { withAuth } from "~/features/auth/server/middleware";
import { addTodoValidation, deleteTodoValidation, editTodoValidation } from "../validations";
import { tryCatch } from "~/lib/utils";
import { setResponseStatus } from "@tanstack/react-start/server";

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
    const [error] = await tryCatch(
      todoService.updateTodo({
        id: data.id,
        userId: context.userId,
        values: {
          title: data.title,
          description: data.description || null,
        },
      })
    );

    if (error) {
      switch (error.name) {
        case "not_found":
          throw json({ type: error.name, message: error.message }, { status: 404 });
        case "unauthorized":
          throw json({ type: error.name, message: error.message }, { status: 401 });
        default:
          throw json({ type: "server_error", message: "Something went wrong" }, { status: 500 });
      }
    }
  });

const deleteTodo = createServerFn({
  method: "POST",
})
  .validator(deleteTodoValidation)
  .middleware([withAuth])
  .handler(async ({ context, data }) => {
    const [error] = await tryCatch(
      todoService.deleteTodo({
        id: data.id,
        userId: context.userId,
      })
    );

    if (error) {
      switch (error.name) {
        case "not_found":
          setResponseStatus(404);
          throw json({ type: error.name, message: error.message });
        case "unauthorized":
          setResponseStatus(401);
          throw json({ type: error.name, message: error.message });
        default:
          setResponseStatus(500);
          throw json({ type: "server_error", message: "Something went wrong" });
      }
    }
  });

export const todoController = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
