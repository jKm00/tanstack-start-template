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
  const _addTodo = useServerFn(todoController.addTodo);

  return useMutation({
    mutationKey: mutationKeys.addTodo,
    mutationFn: async ({ title, description }: { title: string; description?: string }) => {
      const [error, _] = await tryCatch(_addTodo({ data: { title, description } }));

      if (error) {
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
  const _updateTodo = useServerFn(todoController.updateTodo);

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
      const [error, _] = await tryCatch(_updateTodo({ data: { id, title, description } }));

      if (error) {
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}
