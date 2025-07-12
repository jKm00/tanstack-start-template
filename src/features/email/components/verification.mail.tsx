export function VerificationTemplate({ url }: { url: string }) {
  return (
    <div>
      <h1>Verify your email</h1>
      <p>Please click the link below to verify your email</p>
      <a href={url}>Verify my email</a>
    </div>
  );
}
