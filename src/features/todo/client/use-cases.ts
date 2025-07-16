import { useServerFn } from "@tanstack/react-start";
import { addTodo } from "../server/controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tryCatch } from "~/utils";

const queryKey = ["todos"];

export function useAddTodo() {
  const queryClient = useQueryClient();
  const _addTodo = useServerFn(addTodo);

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
