import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/features/auth/lib/auth-client";
import { ArrowRight, Check, Gem, LogIn } from "lucide-react";

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
              StatTrack
            </Link>
          </h1>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/" hash="about">
                About
              </Link>
            </li>
            <li>
              <Link to="/" hash="pricing">
                Pricing
              </Link>
            </li>
          </ul>
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
      </header>
      <div
        className="mx-auto flex flex-col items-center my-56"
        style={{ width: "min(100%, 1200px)" }}
      >
        <Gem className="size-8" />
        <h1 className="text-6xl font-bold mb-4">StatTrack</h1>
        <p className="max-w-[80ch] text-center text-sm mb-8">
          You're already putting in the work—now it's time to see the results. Track your exercises
          with precision, monitor your growth, and stay motivated with clear, personalized
          analytics.
        </p>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/sign-up">
              Get Started <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/" hash="about">
              About
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
