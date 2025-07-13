import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Gem } from "lucide-react";
import { useState } from "react";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSignUp } from "~/features/auth/use-cases";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const mutation = useSignUp();

  async function signUp() {
    setError("");

    mutation.mutate(
      {
        name,
        email,
        password,
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
      <div className="flex flex-col items-center mb-8">
        <Link to="/">
          <Gem className="mb-2" />
        </Link>
        <h1 className="font-bold text-2xl mb-2">Start your journy with StatTrack</h1>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
        className="grid mb-4"
        style={{ width: "min(100%, 500px)" }}
      >
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <LoaderButton isLoading={mutation.isPending} type="submit">
          Sign Up
        </LoaderButton>
        <div className="text-destructive mt-2 text-center">{error}</div>
      </form>
    </div>
  );
}
