export function ResetPasswordTemplate({ url }: { url: string }) {
  return (
    <div>
      <h1>Reset password</h1>
      <p>Please click the link below to reset your password</p>
      <a href={url}>Reset password</a>
    </div>
  );
}
