import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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

  async function resetPassword() {
    if (newPassword === "") return;
    if (!token) return;

    const { error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      toast.error("Failed to reset password. Please try again.");
      return;
    }

    navigate({ to: "/sign-in" });
  }

  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword();
      }}
    >
      <Input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button type="submit">Update password</Button>
    </form>
  );
}
