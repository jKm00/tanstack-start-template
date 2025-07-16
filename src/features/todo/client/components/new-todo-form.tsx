import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Plus } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { useAddTodo } from "../use-cases";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { todoValidation } from "../../validations";

export default function NewTodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(todoValidation),
  });
  const mutation = useAddTodo();

  async function onSubmit(data: z.infer<typeof todoValidation>) {
    mutation.mutate(
      {
        title: data.title,
        description: data.description,
      },
      {
        onError: (error) => {
          toast.error(`Failed to add todo: ${error.message}`);
        },
        onSuccess: () => {
          reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <div className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a new todo"
              {...register("title", { required: "Title is required" })}
              aria-invalid={errors.title ? "true" : "false"}
            />
            <p className="text-destructive text-sm mb-2">{errors.title?.message}</p>
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="(Optional) Enter a description"
              {...register("description")}
            />
          </div>
          <LoaderButton isLoading={mutation.isPending} type="submit">
            <Plus className="size-4" />
            Add
          </LoaderButton>
        </form>
      </CardContent>
    </Card>
  );
}
