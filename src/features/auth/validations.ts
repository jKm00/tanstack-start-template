import z from "zod";

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/(?=.*\d)/, "Password must contain at least one number")
  .regex(/(?=.*[@$!%*?&#])/, "Password must contain at least one special character");

export const signInValidation = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: passwordValidation,
});

export const requestPasswordResetValidation = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordValidation = z.object({
  newPassword: passwordValidation,
  token: z.string().min(1, "Token is required"),
});
