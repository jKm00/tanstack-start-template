import { useMutation } from "@tanstack/react-query";
import { authClient } from "~/lib/auth/auth-client";

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (email === "" || password === "") {
        throw new Error("Email and password are required!");
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
      if (name === "") {
        throw new Error("Name is required!");
      }

      if (email === "") {
        throw new Error("Email is required!");
      }

      if (password === "") {
        throw new Error("Password is required!");
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

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      // TODO: Validate properly
      if (email === "") {
        throw new Error("Email is required!");
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
      if (newPassword === "") {
        throw new Error("New password is required!");
      }
      if (!token || token === "") {
        throw new Error("Token is required!");
      }

      await authClient.resetPassword({
        newPassword,
        token,
      });
    },
  });
}
