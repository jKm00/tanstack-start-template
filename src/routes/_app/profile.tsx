import { createFileRoute } from "@tanstack/react-router";
import AddPassKey from "~/features/auth/client/components/add-passkey";
import ChangeEmailForm from "~/features/auth/client/components/change-email";
import ChangePasswordForm from "~/features/auth/client/components/change-password";

export const Route = createFileRoute("/_app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="font-bold text-xl mb-4">Manage Profile</h1>
      <div className="grid gap-8">
        <ChangeEmailForm />
        <ChangePasswordForm />
        <AddPassKey />
      </div>
    </>
  );
}
