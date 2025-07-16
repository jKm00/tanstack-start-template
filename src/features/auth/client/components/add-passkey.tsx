import { LoaderButton } from "~/components/ui/button";
import { useAddPasskey } from "../use-cases";
import { toast } from "sonner";

export default function AddPassKey() {
  const mutation = useAddPasskey();

  function addPasskey() {
    mutation.mutate(undefined, {
      onError: (error) => {
        toast.error(error.message || "Failed to add passkey");
      },
      onSuccess: () => {
        toast.success("Passkey added successfully!");
      },
    });
  }

  return (
    <div>
      <h2 className="font-bold mb-2">Passkey</h2>
      <LoaderButton onClick={addPasskey} isLoading={mutation.isPending}>
        Add passkey to account
      </LoaderButton>
    </div>
  );
}
