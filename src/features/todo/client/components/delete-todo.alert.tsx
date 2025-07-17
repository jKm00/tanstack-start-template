import { Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, LoaderButton } from "~/components/ui/button";
import { useDeleteTodo } from "../use-cases";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteTodoAlert({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteTodo();

  function handleDelete() {
    mutation.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Todo deleted successfully");
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the todo.
          </AlertDialogDescription>
          {mutation.error && <p className="text-destructive text-sm ">{mutation.error.message}</p>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <X />
            Cancel
          </AlertDialogCancel>
          <LoaderButton
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
            onClick={handleDelete}
            variant="destructive"
          >
            <Trash />
            Delete Todo
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
