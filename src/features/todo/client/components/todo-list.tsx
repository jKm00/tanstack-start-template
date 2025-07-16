import { useMutationState, useSuspenseQuery } from "@tanstack/react-query";
import { mutationKeys, todosQueryOptions } from "../use-cases";
import { Suspense } from "react";
import Loader from "~/components/Loader";
import { Todo } from "../../schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { User } from "~/features/auth/schema";

export default function TodoList() {
  return (
    <div className="py-4">
      <h2 className="font-bold text-2xl">Todos</h2>
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
  }) as { title: string; description?: string }[];

  return (
    <ul className="space-y-2">
      {variables.map((variable) => (
        <div key={variable.title} className="animate-pulse">
          <TodoCard
            todo={{
              id: crypto.randomUUID() as string,
              title: variable.title,
              description: variable.description || "",
              userId: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
            user={null}
          />
        </div>
      ))}
      {todosQuery.data.length === 0 ? (
        <li className="text-muted-foreground text-sm">You dont have any todos yet...</li>
      ) : (
        todosQuery.data.map((res) => <TodoCard key={res.todo.id} todo={res.todo} user={res.user} />)
      )}
    </ul>
  );
}

function TodoCard({ todo, user }: { todo: Todo; user: User | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>
          {user?.name || "Unknown"} -{" "}
          {todo.createdAt.toLocaleDateString("nb-NO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </CardDescription>
      </CardHeader>
      {todo.description && (
        <CardContent>
          <p>{todo.description}</p>
        </CardContent>
      )}
    </Card>
  );
}
