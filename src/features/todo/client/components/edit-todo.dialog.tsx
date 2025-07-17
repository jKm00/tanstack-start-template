import { Button, LoaderButton } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Save, SquarePen, X } from "lucide-react";
import { useUpdateTodo } from "../use-cases";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodoValidation } from "../../validations";
import { Todo } from "../../types";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";

export function EditTodoDialog({ todo }: { todo: Todo }) {
  const form = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const mutation = useUpdateTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(editTodoValidation),
  });

  function onSubmit() {
    mutation.mutate(
      {
        id: getValues("id"),
        title: getValues("title"),
        description: getValues("description"),
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Todo updated successfully");
        },
      }
    );
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      reset();
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <SquarePen className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} ref={form} className="grid gap-4">
          <input type="hidden" defaultValue={todo.id} {...register("id")} />
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              defaultValue={todo.title}
              {...register("title")}
              aria-invalid={errors.title ? "true" : "false"}
            />
            <p className="text-sm text-destructive">{errors.title?.message}</p>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="(Optional) Add a description"
              defaultValue={todo.description || ""}
              {...register("description")}
              aria-invalid={!!errors.description}
            />
          </div>
          {mutation.error && (
            <p className="text-destructive text-sm text-center">{mutation.error.message}</p>
          )}
        </form>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              <X />
              Cancel
            </Button>
          </DialogClose>
          <LoaderButton
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            onClick={() => form.current?.requestSubmit()}
          >
            <Save />
            Save changes
          </LoaderButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
