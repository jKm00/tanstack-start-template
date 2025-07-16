import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { Gem } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from "~/features/theme/client/theme-toggle";
import { isAuthenticated } from "~/features/auth/server/utils";
import UserMenu from "~/features/auth/client/components/user-menu";

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
      <header className="flex justify-between items-center gap-4 p-4">
        <h1 className="font-bold">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Gem className="size-4" />
            JKM Template
          </Link>
        </h1>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/dashboard">Todos</Link>
          </li>
          <Separator orientation="vertical" />
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <Outlet />
    </div>
  );
}
