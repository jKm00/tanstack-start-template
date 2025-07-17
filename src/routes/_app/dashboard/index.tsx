import { createFileRoute } from "@tanstack/react-router";
import NewTodoForm from "~/features/todo/client/components/new-todo.form";
import TodoList from "~/features/todo/client/components/todo-list";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto my-8" style={{ width: "min(800px, 100%)" }}>
      <NewTodoForm />
      <TodoList />
    </main>
  );
}
