import { useMutationState, useSuspenseQuery } from "@tanstack/react-query";
import { mutationKeys, todosQueryOptions } from "../use-cases";
import { Suspense } from "react";
import Loader from "~/components/Loader";

export default function TodoList() {
  return (
    <div className="py-4">
      <h2 className="font-bold">Your Todos</h2>
      <Suspense fallback={<Loader />}>
        <TodoListInner />
      </Suspense>
    </div>
  );
}

function TodoListInner() {
  const todosQuery = useSuspenseQuery(todosQueryOptions());

  const variables = useMutationState({
    filters: { mutationKey: mutationKeys.addTodo, status: "pending" },
    select: (mutation) => mutation.state.variables,
  }) as string[];

  return (
    <ul>
      {variables.map((variable) => (
        <li key={variable} className="animate-pulse text-muted-foreground">
          {variable}
        </li>
      ))}
      {todosQuery.data.length === 0 ? (
        <li className="text-muted-foreground text-sm">You dont have any todos yet...</li>
      ) : (
        todosQuery.data.map((todo) => <li key={todo.id}>{todo.title}</li>)
      )}
    </ul>
  );
}
