import { Terminal } from "lucide-react";

export default function DevFlag() {
  const isDev = import.meta.env.DEV;

  if (!isDev) return null;

  return (
    <p className="fixed bottom-0 right-0 z-50 flex items-center gap-1 rounded-tl-full pl-6 pr-4 py-0.5 bg-destructive text-destructive-foreground text-sm">
      <Terminal className="size-4" />
      development
    </p>
  );
}
