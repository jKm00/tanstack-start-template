import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/features/auth/lib/auth-client";
import { ArrowRight, Gem, Github, LogIn, Play } from "lucide-react";
import { ThemeToggle } from "~/features/theme/client/theme-toggle";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="p-4">
        <div
          className="mx-auto flex items-center justify-between gap-4"
          style={{ width: "min(100%, 1200px)" }}
        >
          <h1 className="font-bold">
            <Link to="/" className="flex items-center gap-2">
              <Gem className="size-4" />
              JKM Template
            </Link>
          </h1>
          <div className="flex items-center gap-2">
            {/* TODO: Add link to repo */}
            <Button asChild variant="ghost" className="px-2">
              <a href="" target="_blank">
                <Github />
              </a>
            </Button>
            <ThemeToggle />
            {session ? (
              <Button asChild size="sm">
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to="/sign-in">
                  Sign In <LogIn />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <div
        className="mx-auto flex flex-col items-center my-56"
        style={{ width: "min(100%, 1200px)" }}
      >
        <Gem className="size-8" />
        <h1 className="text-6xl font-bold mb-4">JKM Template</h1>
        <p className="max-w-[80ch] text-center text-sm mb-8">
          A minimal full-stack Todo app that demonstrates how to wire together the modern TanStack
          ecosystem with type-safe database access and batteries-included authentication.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/sign-up">
              <Play />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="secondary">
            {/* TODO: Add link to repo */}
            <a href="/" target="_blank">
              <Github />
              Explore code
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
