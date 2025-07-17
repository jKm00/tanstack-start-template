import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRequestPasswordReset } from "~/features/auth/client/use-cases";
import { requestPasswordResetValidation } from "../../validations";

export default function RequestPasswordReset() {
  const mutation = useRequestPasswordReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(requestPasswordResetValidation),
  });

  async function onResetPassword() {
    mutation.mutate(getValues("email"), {
      onSuccess: () => {
        toast.info(
          "If an account with that email exists, a reset link has been sent to your email address."
        );
      },
    });
  }

  return (
    <div className="mx-auto" style={{ width: "min(100%, 500px)" }}>
      <h2 className="text-2xl font-bold mb-2">Request Reset password</h2>
      <p className="text-sm mb-8">
        Please enter the email of the account you wish to reset the password for.
      </p>
      <form className="grid gap-4" onSubmit={handleSubmit(onResetPassword)}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <p className="text-destructive text-sm">{errors.email?.message}</p>
        </div>
        <LoaderButton isLoading={mutation.isPending} disabled={mutation.isPending} type="submit">
          Send reset mail
        </LoaderButton>
        {mutation.error && (
          <p className="text-destructive text-sm text-center">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
}
