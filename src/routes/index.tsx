import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth-client";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header>
        {session ? (
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        )}
      </header>
      <div className="p-2">
        <h3>Welcome Home!!!</h3>
      </div>
    </>
  );
}
