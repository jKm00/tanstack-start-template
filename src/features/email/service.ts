import { emailClient } from "~/lib/email";
import { VerificationTemplate } from "./components/verification";

async function sendVerificationMail({ to, url }: { to: string; url: string }) {
  console.log("Sending verification email to:", to, "with URL:", url);
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

export const email = {
  sendVerificationMail,
};
