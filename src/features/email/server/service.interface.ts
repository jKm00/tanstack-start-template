export interface EmailService {
  sendVerificationMail: ({ to, url }: { to: string; url: string }) => Promise<void>;
  sendResetPasswordMail: ({ to, url }: { to: string; url: string }) => Promise<void>;
  sendChangeEmailVerification: ({
    to,
    newEmail,
    url,
  }: {
    to: string;
    newEmail: string;
    url: string;
  }) => Promise<void>;
}
