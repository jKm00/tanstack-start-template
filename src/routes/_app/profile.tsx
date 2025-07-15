import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useChangeEmail } from "~/features/auth/use-cases";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
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
    <main className="mx-auto my-8" style={{ width: "min(100%, 800px)" }}>
      <h1 className="font-bold text-xl mb-4">Manage Profile</h1>
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
    </main>
  );
}
