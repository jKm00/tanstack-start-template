import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Gem } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSignUp } from "~/features/auth/client/use-cases";
import { registerValidation } from "~/features/auth/validations";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const mutation = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerValidation),
  });

  async function onSignUp(data: z.infer<typeof registerValidation>) {
    mutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setEmailSent(true);
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
        <h1 className="font-bold text-2xl mb-2">Start your journy</h1>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSignUp)}
        className="grid space-y-4"
        style={{ width: "min(100%, 500px)" }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <p className="text-destructive text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <p className="text-destructive text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center gap-2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              variant="outline"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
          <p className="text-destructive text-sm">{errors.password?.message}</p>
        </div>
        <LoaderButton isLoading={mutation.isPending} disabled={mutation.isPending} type="submit">
          Sign Up
        </LoaderButton>
        <p className="text-destructive text-sm text-center">{mutation.error?.message}</p>
        {emailSent && (
          <p className="text-sm text-green-400 text-center">
            An email has been sent to your address. Please verify your email to signing in.
          </p>
        )}
      </form>
    </div>
  );
}
