import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth/auth-client";
import { ArrowRight, Check, LogIn } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="p-4 border-b">
        <div
          className="mx-auto flex items-center justify-between gap-4"
          style={{ width: "min(100%, 1200px)" }}
        >
          <div className="flex items-center gap-4">
            <h1 className="font-bold">
              <Link to="/">StatTrack</Link>
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
          </div>
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
      <div className="mx-auto my-56" style={{ width: "min(100%, 1200px)" }}>
        <h1 className="text-6xl font-semibold mb-4">StatTrack</h1>
        <p className="max-w-[80ch] mb-8">
          You're already putting in the work—now it's time to see the results. Track your exercises
          with precision, monitor your growth, and stay motivated with clear, personalized
          analytics.
        </p>
        <div className="flex items-center gap-4 mb-10">
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
        <ul className="grid gap-1 text-sm">
          <li className="flex items-center gap-2">
            <Check className="size-4" /> Effortless Workout Logging
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4" /> Powerful Progress Analytic
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4" /> Goal & Milestone Tracking
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4" /> Custom Workouts & Templates
          </li>
        </ul>
      </div>
    </>
  );
}
