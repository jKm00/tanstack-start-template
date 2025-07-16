import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, LoaderButton } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { authClient } from "../../lib/auth-client";
import { useSignOut } from "../use-cases";
import { toast } from "sonner";

export default function UserMenu() {
  const { data: session } = authClient.useSession();

  const navigate = useNavigate();
  const mutation = useSignOut();

  function handleSignOut() {
    mutation.mutate(undefined, {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        navigate({ to: "/sign-in" });
      },
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="leading-4">
            <p>{session?.user.name}</p>
            <p className="text-sm text-muted-foreground">{session?.user.email}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/profile">
              <Settings />
              Manage account
            </Link>
          </Button>
          <LoaderButton
            onClick={handleSignOut}
            isLoading={mutation.isPending}
            variant="outline"
            size="sm"
          >
            <LogOut />
            Sign Out
          </LoaderButton>
        </div>
        <footer className="mt-8">
          <p className="text-xs text-muted-foreground text-center">JKM Template | Version 0.0.1</p>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
