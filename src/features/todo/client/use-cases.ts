import { useServerFn } from "@tanstack/react-start";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { tryCatch } from "~/utils";
import { todoController } from "../server/controller";

const queryKey = ["todos"];

export const todosQueryOptions = () => {
  console.log("todosQueryOptions called");
  return queryOptions({
    queryKey,
    queryFn: () => todoController.getTodos(),
  });
};

export function useAddTodo() {
  const queryClient = useQueryClient();
  const _addTodo = useServerFn(todoController.addTodo);

  return useMutation({
    mutationFn: async (title: string) => {
      const [error, _] = await tryCatch(_addTodo({ data: { title } }));

      if (error) {
        throw error;
      }

      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
}
