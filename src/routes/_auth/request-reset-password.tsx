import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_auth/request-reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");

  async function requestResetPassword() {
    if (email === "") return;

    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    toast.info(
      "If an account with that email exists, a reset link has been sent to your email address."
    );
  }

  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        requestResetPassword();
      }}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Send reset mail</Button>
    </form>
  );
}
