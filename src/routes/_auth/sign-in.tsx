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
import { useSignIn } from "~/features/auth/client/use-cases";
import { Separator } from "~/components/ui/separator";

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
        className="grid"
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
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            to="/request-reset-password"
            className="text-sm text-muted-foreground underline text-center block"
          >
            Forgot password
          </Link>
        </div>
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
      <div className="flex items-center gap-4 mt-4 mb-6">
        <span className="bg-muted h-1 grow" />
        <p className="text-muted-foreground">Or</p>
        <span className="bg-muted h-1 grow" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Button variant="outline" onClick={() => alert("Not implemented")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              fill="currentColor"
            />
          </svg>
          Continue with Apple
        </Button>
        <Button
          variant="outline"
          onClick={async () =>
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
              errorCallbackURL: "/sign-in",
            })
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
      <p className="text-xs max-w-[31ch] text-center mx-auto text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link to="/" hash="not-implemented" className="underline">
          Temrs of Service
        </Link>{" "}
        and{" "}
        <Link to="/" hash="not-implemented" className="underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
