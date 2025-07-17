import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useResetPassword } from "~/features/auth/client/use-cases";
import { resetPasswordValidation } from "../../validations";

export default function ResetPassword({ token }: { token: string }) {
  const navigate = useNavigate();
  const mutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(resetPasswordValidation),
  });

  async function resetPassword() {
    mutation.mutate(
      {
        newPassword: getValues("newPassword"),
        token: getValues("token"),
      },
      {
        onSuccess: () => {
          navigate({ to: "/sign-in" });
        },
      }
    );
  }

  return (
    <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form className="grid gap-4" onSubmit={handleSubmit(resetPassword)}>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("newPassword")}
            aria-invalid={errors.newPassword ? "true" : "false"}
          />
          <p className="text-destructive text-sm">{errors.newPassword?.message}</p>
        </div>
        <input type="hidden" defaultValue={token} {...register("token")} />
        <LoaderButton isLoading={mutation.isPending} type="submit">
          Update password
        </LoaderButton>
        {mutation.error && (
          <p className="text-center text-sm text-destructive mt-2">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
}
