import { useMutation } from "@tanstack/react-query";
import { authClient } from "~/features/auth/lib/auth-client";
import {
  registerValidation,
  requestPasswordResetValidation,
  resetPasswordValidation,
  signInValidation,
} from "../validations";
import z from "zod";

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = signInValidation.safeParse({ email, password });

      if (!result.success) {
        throw new Error("Make sure to fill in all fields correctly");
      }

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        if (error.status === 403) {
          throw new Error("Please verify your email address");
        }
        throw new Error("Sign in failed. Please check your credentials and try again.");
      }
    },
  });
}

export function useSignInWithPasskey() {
  return useMutation({
    mutationFn: async () => {
      await authClient.signIn.passkey();
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const result = registerValidation.safeParse({
        name,
        email,
        password,
      });

      if (!result.success) {
        throw new Error("Make sure to fill in all fields correctly");
      }

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        if (error.status === 409) {
          throw new Error("Email already exists");
        }
        throw new Error("Sign up failed. Please try again.");
      }
    },
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      });
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error("Sign out failed. Please try again.");
      }
    },
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      const result = requestPasswordResetValidation.safeParse({ email });

      if (!result.success) {
        throw new Error("Please enter a valid email address");
      }

      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string | undefined;
    }) => {
      const result = resetPasswordValidation.safeParse({ newPassword, token });

      if (!result.success) {
        const flattened = z.flattenError(result.error);
        if (flattened.fieldErrors.newPassword) {
          throw new Error(flattened.fieldErrors.newPassword[0]);
        }
        if (flattened.fieldErrors.token) {
          throw new Error(flattened.fieldErrors.token[0]);
        }
        throw new Error("Please fill in all fields correctly");
      }

      await authClient.resetPassword({
        newPassword,
        token,
      });
    },
  });
}

export function useChangeEmail() {
  return useMutation({
    mutationFn: async ({ currentEmail, newEmail }: { currentEmail: string; newEmail: string }) => {
      if (newEmail === "") {
        throw new Error("New email is required!");
      }

      if (newEmail === currentEmail) {
        throw new Error("New email must be different from current email!");
      }

      const { error } = await authClient.changeEmail({
        newEmail,
        callbackURL: "/dashboard",
      });

      if (error) {
        throw new Error(error.message || "Failed to change email");
      }
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      current,
      newPassword,
      revokeOtherSessions,
    }: {
      current: string;
      newPassword: string;
      revokeOtherSessions: boolean;
    }) => {
      const { error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: current,
        revokeOtherSessions,
      });

      if (error) {
        throw new Error(error.message || "Failed to change email");
      }
    },
  });
}

export function useAddPasskey() {
  return useMutation({
    mutationFn: async () => {
      await authClient.passkey.addPasskey();
    },
  });
}
