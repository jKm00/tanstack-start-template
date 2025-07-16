import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { Gem, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, LoaderButton } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { useSignOut } from "~/features/auth/client/use-cases";
import { ThemeToggle } from "~/features/theme/client/theme-toggle";
import { authClient } from "~/features/auth/lib/auth-client";
import { isAuthenticated } from "~/features/auth/server/utils";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({ to: "/sign-in" });
    }
  },
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

  const navigate = useNavigate();
  const mutation = useSignOut();

  function handleSignOut() {
    mutation.mutate(undefined, {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        navigate({ to: "/sign-in" });
      },
    });
  }

  return (
    <div>
      <header className="flex justify-between items-center gap-4 p-4">
        <h1 className="font-bold">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Gem className="size-4" />
            StatTrack
          </Link>
        </h1>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/dashboard">Analytics</Link>
          </li>
          <li>
            <Link to="/dashboard/exercises">Exercises</Link>
          </li>
          <li>
            <Link to="/dashboard/workouts">Workouts</Link>
          </li>
          <li>
            <Link to="/dashboard/logs">Logs</Link>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-0 rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="leading-4">
                  <p>{session?.user.name}</p>
                  <p className="text-sm text-muted-foreground">{session?.user.email}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile">
                    <Settings />
                    Manage account
                  </Link>
                </Button>
                <LoaderButton
                  onClick={handleSignOut}
                  isLoading={mutation.isPending}
                  variant="outline"
                  size="sm"
                >
                  <LogOut />
                  Sign Out
                </LoaderButton>
              </div>
              <footer className="mt-8">
                <p className="text-xs text-muted-foreground text-center">
                  StatTrack | Version 0.0.1
                </p>
              </footer>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
