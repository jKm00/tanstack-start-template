export function ChangeEmailVerificationTemplate({
  newEmail,
  url,
}: {
  newEmail: string;
  url: string;
}) {
  return (
    <div>
      <h1>Verify your new email</h1>
      <p>
        Your email has been changed to {newEmail}. Please click the link below to verify your new
        email.
      </p>
      <a href={url}>Verify new email</a>
    </div>
  );
}
