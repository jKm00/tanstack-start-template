import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "~/lib/auth/utils";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({ to: "/sign-in" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
