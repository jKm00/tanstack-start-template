import { useSuspenseQuery } from "@tanstack/react-query";
import { todosQueryOptions } from "../use-cases";
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

  return (
    <ul>
      {todosQuery.data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
