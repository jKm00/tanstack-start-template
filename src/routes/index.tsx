import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/features/auth/lib/auth-client";
import { ArrowRight, Gem, Github, LogIn, Play } from "lucide-react";
import { Footer } from "~/components/Footer";
import StackList from "~/components/StackList";
import { ThemeToggle } from "~/features/theme/theme-toggle";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex min-h-screen flex-col mx-auto" style={{ width: "min(100%, 1200px)" }}>
      <header className="p-4">
        <div className="flex items-center justify-between gap-4">
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
      <div className="flex flex-col grow justify-center items-center">
        <div className="flex flex-col items-center mb-4 w-fit">
          <Gem className="size-8" />
          <h1 className="text-6xl font-bold">JKM Template</h1>
        </div>
        <p className="max-w-[80ch] text-sm mb-12 text-center">
          A minimal full-stack Todo app that demonstrates how to wire together the modern TanStack
          ecosystem with type-safe database access and batteries-included authentication.
        </p>
        <div className="flex gap-2 mb-12">
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
        <StackList />
      </div>
      <Footer className="mx-auto my-4" />
    </div>
  );
}
