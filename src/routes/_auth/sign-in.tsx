import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, LoaderButton } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/features/auth/lib/auth-client";
import { Eye, EyeOff, Gem, Key } from "lucide-react";
import { Label } from "~/components/ui/label";
import {
  useResendVerificationEmail,
  useSignIn,
  useSignInWithPasskey,
} from "~/features/auth/client/use-cases";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInValidation } from "~/features/auth/validations";
import z from "zod";
import { p } from "node_modules/better-auth/dist/shared/better-auth.Da_FnxgM";
import { toast } from "sonner";
import SignIn from "~/features/auth/client/components/sign-in";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignIn />;
}
