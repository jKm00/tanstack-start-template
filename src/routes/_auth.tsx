import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "~/features/auth/server/utils";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="h-screen grid content-center gap-4">
      <Outlet />
    </div>
  );
}
