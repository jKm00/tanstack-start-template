import { emailClient } from "~/features/email/lib";
import { VerificationTemplate } from "./templates/verification.mail";
import { ResetPasswordTemplate } from "./templates/reset-password.mail";
import { ChangeEmailVerificationTemplate } from "./templates/change-email-verification.mail";
import { EmailService } from "./service.interface";

async function sendVerificationMail({ to, url }: { to: string; url: string }) {
  const { error } = await emailClient.emails.send({
    from: "JKM Template <auto@edvardsen.dev>",
    to: [to],
    subject: "Verify your email",
    react: VerificationTemplate({ url }),
  });

  if (error) {
    console.log("Error sending verification email:", error);
  }
}

async function sendResetPasswordMail({ to, url }: { to: string; url: string }) {
  const { error } = await emailClient.emails.send({
    from: "JKM Template <auto@edvardsen.dev>",
    to: [to],
    subject: "Reset your password",
    react: ResetPasswordTemplate({ url }),
  });

  if (error) {
    console.log("Error sending reset password email:", error);
  }
}

async function sendChangeEmailVerification({
  to,
  newEmail,
  url,
}: {
  to: string;
  newEmail: string;
  url: string;
}) {
  const { error } = await emailClient.emails.send({
    from: "JKM Template <auto@edvardsen.dev>",
    to: [to],
    subject: "Verify your new email address",
    react: ChangeEmailVerificationTemplate({ newEmail, url }),
  });

  if (error) {
    console.log("Error sending change email verification:", error);
  }
}

export const email = {
  sendVerificationMail,
  sendResetPasswordMail,
  sendChangeEmailVerification,
} satisfies EmailService;
