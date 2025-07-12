import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { auth } from ".";

export const isAuthenticated = createServerFn().handler(async () => {
  const headers = getHeaders();
  // @ts-ignore
  const session = await auth.api.getSession({ headers });
  return session !== null;
});
