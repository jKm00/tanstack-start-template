import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/features/auth/lib/auth-client";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { toast } from "sonner";
import { Gem, Key } from "lucide-react";
import { Label } from "~/components/ui/label";
import { useSignIn, useSignInWithPasskey } from "~/features/auth/client/use-cases";

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

  const signInMutation = useSignIn();
  const signInWithPasskeyMutation = useSignInWithPasskey();

  useEffect(() => {
    if (verify) {
      toast.info("Please verify your email address before signing in");
    }
  }, []);

  // Autofill passkey if available
  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey({ autoFill: true });
  }, []);

  async function signIn() {
    setError("");

    signInMutation.mutate(
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

  async function signInWithPasskey() {
    signInWithPasskeyMutation.mutate(undefined, {
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: () => {
        navigate({ to: "/dashboard" });
      },
    });
  }

  return (
    <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
      <div className="flex flex-col items-center mb-8">
        <Link to="/">
          <Gem className="mb-2" />
        </Link>
        <h1 className="font-bold text-2xl mb-2">Welcome to JKM Template</h1>
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
          autoComplete="email webauthn"
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
          autoComplete="current-password webauthn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <LoaderButton isLoading={signInMutation.isPending} type="submit" className="w-full">
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
        <LoaderButton
          variant="outline"
          onClick={signInWithPasskey}
          isLoading={signInWithPasskeyMutation.isPending}
        >
          <Key className="size-4" />
          Continue with Passkey
        </LoaderButton>
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
