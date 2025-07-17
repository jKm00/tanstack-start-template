import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Footer } from "~/components/Footer";
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
    <div className="h-screen flex flex-col gap-4">
      <div className="grow flex flex-col justify-center">
        <Outlet />
      </div>
      <Footer className="mx-auto my-4" />
    </div>
  );
}
