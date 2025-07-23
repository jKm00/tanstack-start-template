import { createFileRoute } from "@tanstack/react-router";
import NewTodoForm from "~/features/todo/client/components/new-todo.form";
import TodoList from "~/features/todo/client/components/todo-list";
import { todosQueryOptions } from "~/features/todo/client/use-cases";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery(todosQueryOptions());
  },
});

function RouteComponent() {
  return (
    <>
      <NewTodoForm />
      <TodoList />
    </>
  );
}
