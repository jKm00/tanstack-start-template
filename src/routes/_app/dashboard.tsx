import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  async function signOut() {
    await authClient.signOut();
    navigate({ to: "/sign-in" });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <Button onClick={signOut} variant="outline">
        Sign Out
      </Button>
    </div>
  );
}
