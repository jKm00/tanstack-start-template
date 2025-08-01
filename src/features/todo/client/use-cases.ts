import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoController } from "../server/controller";
import { tryCatch } from "~/lib/utils";

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
      const [error, _] = await tryCatch(todoController.addTodo({ data: { title, description } }));

      if (error) {
        console.error("Error adding todo:", error); // TODO: Log error to a monitoring service
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey,
      });
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
      const [error, _] = await tryCatch(
        todoController.updateTodo({ data: { id, title, description } })
      );

      if (error) {
        console.error("Error updating todo:", error); // TODO: Log error to a monitoring service
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const [error, _] = await tryCatch(todoController.deleteTodo({ data: { id } }));

      if (error) {
        console.error("Error deleting todo:", error); // TODO: Log error to a monitoring service
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}
