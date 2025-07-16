import { useState } from "react";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAddTodo } from "../use-cases";
import { toast } from "sonner";

export default function NewTodoForm() {
  const [newTodo, setNewTodo] = useState("");

  const mutation = useAddTodo();

  function handleSubmit() {
    if (newTodo === "") {
      toast.info("Please enter a todo title.");
      return;
    }

    mutation.mutate(newTodo, {
      onError: (error) => {
        toast.error(`Failed to add todo: ${error.message}`);
      },
      onSuccess: () => {
        setNewTodo("");
      },
    });
  }

  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-end gap-4"
    >
      <div className="grow">
        <Label htmlFor="new-todo">New Todo</Label>
        <Input
          id="new-todo"
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </div>
      <LoaderButton isLoading={mutation.isPending}>Add Todo</LoaderButton>
    </form>
  );
}
