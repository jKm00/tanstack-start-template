import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth/auth-client";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";

const searchSchema = z.object({
  verify: z.boolean().optional(),
});

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { verify } = Route.useSearch();

  useEffect(() => {
    if (verify) {
      toast.info("Please verify your email address before signing in");
    }
  }, []);

  async function signIn() {
    if (email === "" || password === "") return;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      if (error.status === 403) {
        setError("Please verify your email address");
        return;
      }
      setError("Sign in failed. Please check your credentials and try again.");
      return;
    }

    navigate({ to: "/dashboard" });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
        className="grid gap-2"
        style={{ width: "min(100%, 500px)" }}
      >
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        {error && <div className="text-destructive text-sm">{error}</div>}
      </form>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/sign-up" className="underline">
          Sign up here
        </Link>
      </p>
    </>
  );
}
