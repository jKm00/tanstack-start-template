import { emailClient } from "~/lib/email";
import { VerificationTemplate } from "./components/verification.mail";
import { ResetPasswordTemplate } from "./components/reset-password.mail";

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
  console.log("Sending reset password mail to:", to, "with URL:", url);
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

export const email = {
  sendVerificationMail,
  sendResetPasswordMail,
};
