import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth/auth-client";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";
import { ArrowLeft, Gem } from "lucide-react";
import { Label } from "~/components/ui/label";
import { useSignIn } from "~/features/auth/use-cases";

const searchSchema = z.object({
  verify: z.boolean().optional(),
});

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { verify } = Route.useSearch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const mutation = useSignIn();

  useEffect(() => {
    if (verify) {
      toast.info("Please verify your email address before signing in");
    }
  }, []);

  async function signIn() {
    setError("");

    mutation.mutate(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          setError(error.message);
        },
        onSuccess: () => {
          navigate({ to: "/dashboard" });
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
        <h1 className="font-bold text-2xl mb-2">Welcome to StatTrack</h1>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
        className="grid mb-4"
        style={{ width: "min(100%, 500px)" }}
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <LoaderButton isLoading={mutation.isPending} type="submit" className="w-full">
          Sign In
        </LoaderButton>
        <div className="text-destructive mt-2 text-center">{error}</div>
      </form>
      <Link to="/request-reset-password" className="text-sm underline text-center block mb-4">
        Forgot password
      </Link>
    </div>
  );
}
