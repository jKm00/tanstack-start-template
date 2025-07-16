import { useState } from "react";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useChangePassword } from "../use-cases";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const mutation = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(false);

  function handleChangePassword() {
    mutation.mutate(
      {
        current: currentPassword,
        newPassword,
        revokeOtherSessions,
      },
      {
        onError: (error) => {
          toast.error(error.message || "Failed to change password");
        },
        onSuccess: () => {
          toast.success("Password changed successfully");
          setCurrentPassword("");
          setNewPassword("");
          setRevokeOtherSessions(false);
        },
      }
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleChangePassword();
      }}
    >
      <h2 className="font-bold mb-2">Change password</h2>
      <Label htmlFor="current-password">Current Password</Label>
      <Input
        id="current-password"
        type="password"
        placeholder="********"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="mb-2"
      />
      <Label htmlFor="new-password">New Password</Label>
      <Input
        id="new-password"
        type="password"
        placeholder="********"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mb-2"
      />
      <Label className="mb-4 font-normal">
        <input
          type="checkbox"
          checked={revokeOtherSessions}
          onChange={(e) => setRevokeOtherSessions(e.target.checked)}
        />
        Revoke other sessions when chaning password
      </Label>
      <LoaderButton isLoading={mutation.isPending} disabled={mutation.isPending}>
        Save password
      </LoaderButton>
    </form>
  );
}
