import { createFileRoute } from "@tanstack/react-router";
import SignUp from "~/features/auth/client/components/sign-up";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
