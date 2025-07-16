import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useResetPassword } from "~/features/auth/client/use-cases";
import { authClient } from "~/lib/auth/auth-client";

const searchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/_auth/reset-password")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string>("");

  const mutation = useResetPassword();

  async function resetPassword() {
    setError("");

    mutation.mutate(
      {
        newPassword,
        token,
      },
      {
        onError: (error) => {
          setError(error.message);
        },
        onSuccess: () => {
          navigate({ to: "/sign-in" });
        },
      }
    );
  }

  return (
    <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
      <h1>
        <Link to="/">StatTrack</Link>
      </h1>
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form
        className="grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword();
        }}
      >
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <LoaderButton isLoading={mutation.isPending} type="submit">
          Update password
        </LoaderButton>
        <p className="text-center text-sm text-destructive mt-2">{error}</p>
      </form>
    </div>
  );
}
