import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRequestPasswordReset } from "~/features/auth/client/use-cases";

export const Route = createFileRoute("/_auth/request-reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");

  const mutation = useRequestPasswordReset();

  async function requestResetPassword() {
    setError("");

    mutation.mutate(email, {
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: () => {
        toast.info(
          "If an account with that email exists, a reset link has been sent to your email address."
        );
        setEmail("");
      },
    });
  }

  return (
    <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
      <h2 className="text-2xl font-bold mb-2">Request Reset password</h2>
      <p className="text-sm mb-8">
        Please enter the email of the account you wish to reset the password for.
      </p>
      <form
        className="grid"
        onSubmit={(e) => {
          e.preventDefault();
          requestResetPassword();
        }}
      >
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <LoaderButton isLoading={mutation.isPending} type="submit">
          Send reset mail
        </LoaderButton>
        <p className="text-center text-sm text-destructive mt-2">{error}</p>
      </form>
    </div>
  );
}
