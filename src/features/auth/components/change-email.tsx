import { useState } from "react";
import { toast } from "sonner";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useChangeEmail } from "../use-cases";
import { authClient } from "~/lib/auth/auth-client";

export default function ChangeEmailForm() {
  const { data } = authClient.useSession();
  const mutation = useChangeEmail();

  const [email, setEmail] = useState(data?.user.email || "");
  const [hasMadeChanges, setHasMadeChanges] = useState(false);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setHasMadeChanges(true);
    setEmail(event.target.value);
  }

  async function handleSaveChanges() {
    if (!data?.user.email) return;

    mutation.mutate(
      {
        newEmail: email,
        currentEmail: data?.user.email,
      },
      {
        onError: (error) => {
          toast.error(error.message || "Failed to change email");
        },
        onSuccess: () => {
          toast.info(
            "An email has been sent. Please check your inbox to verify and change your email."
          );
        },
      }
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveChanges();
      }}
    >
      <h2 className="font-bold mb-2">Change email</h2>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={handleChangeEmail}
        className="mb-2"
      />
      <LoaderButton isLoading={mutation.isPending} disabled={!hasMadeChanges}>
        Save changes
      </LoaderButton>
    </form>
  );
}
