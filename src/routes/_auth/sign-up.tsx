import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function signUp() {
    if (name === "" || email === "" || password === "") return;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error?.message) {
      setError(error.message);
      return;
    }

    navigate({ to: "/sign-in" });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
        className="grid gap-2"
        style={{ width: "min(100%, 500px)" }}
      >
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
        {error && <div className="text-destructive text-sm">{error}</div>}
      </form>
      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/sign-in" className="underline">
          Sign in here
        </Link>
      </p>
    </>
  );
}
