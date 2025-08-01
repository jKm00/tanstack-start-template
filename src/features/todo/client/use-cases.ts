import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoController } from "../server/controller";
import { tryCatch } from "~/lib/utils";
import { NotFoundError } from "~/errors/not-found";
import { UnauthorizedError } from "~/errors/unathorized";
import { ApiError } from "~/errors/api-error";

const queryKey = ["todos"];

export const mutationKeys = {
  addTodo: ["addTodo"],
};

export const todosQueryOptions = () => {
  return queryOptions({
    queryKey,
    queryFn: () => todoController.getTodos(),
  });
};

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.addTodo,
    mutationFn: async ({ title, description }: { title: string; description?: string }) => {
      try {
        await todoController.addTodo({ data: { title, description } });

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error) {
        console.error("Error adding todo:", error); // TODO: Log error to a monitoring service
        throw new Error("Something went wrong while adding the todo, please try again later");
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description?: string;
    }) => {
      try {
        await todoController.updateTodo({
          data: { id, title, description },
        });

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error) {
        console.error("Error updating todo:", error); // TODO: Log error to a monitoring service
        if (error instanceof Error) {
          throw new Error("Something went wrong while updating the todo, please try again later");
        } else if (error instanceof ApiError) {
          switch (error.type) {
            case "not_found":
              throw new NotFoundError("We could not find the todo you are trying to update");
            case "unauthorized":
              throw new UnauthorizedError("You are not authorized to update this todo");
            default:
              throw new Error(
                "Something went wrong while updating the todo, please try again later"
              );
          }
        }
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await todoController.deleteTodo({ data: { id } });

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch (error) {
        console.error("Error deleting todo:", error); // TODO: Log error to a monitoring service
        if (error instanceof Error) {
          throw new Error("Something went wrong while deleting the todo, please try again later");
        } else if (error instanceof ApiError) {
          switch (error.type) {
            case "not_found":
              throw new NotFoundError("We could not find the todo you are trying to delete");
            case "unauthorized":
              throw new UnauthorizedError("You are not authorized to delete this todo");
            default:
              throw new Error(
                "Something went wrong while deleting the todo, please try again later"
              );
          }
        }
      }
    },
  });
}
