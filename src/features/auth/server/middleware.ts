import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/features/auth/lib";

export const withAuth = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getWebRequest();

  if (!request?.headers) {
    throw redirect({ to: "/sign-in" });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw redirect({ to: "/sign-in" });
  }

  return next({
    context: { userId: session.user.id },
  });
});
