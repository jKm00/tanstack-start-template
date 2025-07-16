import { useState } from "react";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAddTodo } from "../use-cases";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

export default function NewTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useAddTodo();

  function handleSubmit() {
    if (title === "") {
      toast.info("Please enter a todo title.");
      return;
    }

    mutation.mutate(
      {
        title,
        description: description || undefined,
      },
      {
        onError: (error) => {
          toast.error(`Failed to add todo: ${error.message}`);
        },
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Todo</CardTitle>
        <CardDescription>Enter details for a new todo</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid"
        >
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter a new todo"
            className="mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="(Optional) Enter a description"
            className="mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <LoaderButton isLoading={mutation.isPending}>
            <Plus className="size-4" />
            Add
          </LoaderButton>
        </form>
      </CardContent>
    </Card>
  );
}
