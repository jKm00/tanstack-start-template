import { emailClient } from "~/lib/email";
import { VerificationTemplate } from "./components/verification.mail";
import { ResetPasswordTemplate } from "./components/reset-password.mail";
import { ChangeEmailVerificationTemplate } from "./components/change-email-verification.mail";

async function sendVerificationMail({ to, url }: { to: string; url: string }) {
  const { error } = await emailClient.emails.send({
    from: "StatTrack <auto@edvardsen.dev>",
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
    from: "StatTrack <auto@edvardsen.dev>",
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
    from: "StatTrack <auto@edvardsen.dev>",
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
};
