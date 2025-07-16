import { getHeaders } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

export async function getServerSession() {
  const headers = getHeaders();
  // @ts-ignore
  return await auth.api.getSession({ headers });
}
