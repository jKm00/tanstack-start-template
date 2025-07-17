import React from "react";
import { cn } from "~/lib/utils";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(({ className, ...props }, ref) => {
  return (
    <footer className={cn(className)} ref={ref} {...props}>
      <ul className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          Made by{" "}
          <a href="https://www.edvardsen.dev/" target="_blank" className="underline">
            Joakim Edvardsen
          </a>
        </li>
        <span>|</span>
        <li>
          {/* TODO: Add link to repo */}
          <a href="" target="_blank" className="underline">
            Source Code
          </a>
        </li>
      </ul>
    </footer>
  );
});

export { Footer };
