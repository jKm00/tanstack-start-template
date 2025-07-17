import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Home, RefreshCcw } from "lucide-react";
import z from "zod";
import { Button } from "~/components/ui/button";
import ResetPassword from "~/features/auth/client/components/reset-password";

const searchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/_auth/reset-password")({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { token } = Route.useSearch();

  if (!token) {
    return (
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-4">Invalid Token</h1>
        <p className="max-w-[80ch] mb-8">
          You are missing or have an invalid token in your URL. Please make sure to use the full URL
          sent to your email!
        </p>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/request-reset-password">
              <RefreshCcw />
              Request a new password reset
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <Home /> Go back to home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ResetPassword token={token} />;
}
