import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
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
  const location = useLocation();

  return (
    <div>
      <header className="flex justify-between items-center gap-4 p-4">
        <div className="flex items-center gap-4">
          <h1 className="font-bold mr-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Gem className="size-4" />
              JKM Template
            </Link>
          </h1>
          <ul className="flex items-center gap-4">
            <li className={location.pathname === "/dashboard" ? "text-primary" : ""}>
              <Link to="/dashboard">Todos</Link>
            </li>
            <li className={location.pathname === "/profile" ? "text-primary" : ""}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <Outlet />
    </div>
  );
}
