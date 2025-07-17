import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { Gem, Github } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from "~/features/theme/client/theme-toggle";
import { isAuthenticated } from "~/features/auth/server/utils";
import UserMenu from "~/features/auth/client/components/user-menu";
import { Footer } from "~/components/Footer";
import { Button } from "~/components/ui/button";

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
    <div className="flex flex-col min-h-screen">
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
          {/* TODO: Add link to repo */}
          <Button asChild variant="ghost" className="px-2">
            <a href="" target="_blank">
              <Github />
            </a>
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <main className="mx-auto my-8 grow" style={{ width: "min(800px, 100%)" }}>
        <Outlet />
      </main>
      <Footer className="mx-auto my-4" style={{ width: "min(800px, 100%)" }} />
    </div>
  );
}
