import { Dot } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stack = [
  {
    name: "TanStack Start",
    description:
      "SSR, Streaming, Server Functions, API Routes, bundling and more powered by TanStack Router and Vite. Ready to deploy to your faviroite hosting provider.",
    link: "https://tanstack.com/start/latest",
  },
  {
    name: "TanStack Query",
    description:
      "Data fetching, caching, and synchronization with TanStack Query. Type-safe data fetching with React Query.",
    link: "https://tanstack.com/query/latest",
  },
  {
    name: "React Hook Form",
    description: "Form management and validation with React Hook Form.",
    link: "https://react-hook-form.com/",
  },
  {
    name: "Better-Auth",
    description:
      "Authentication and authorization with Better-Auth. Type-safe authentication with TanStack Query.",
    link: "https://www.better-auth.com/",
  },
  {
    name: "Drizzle ORM",
    description: "Type-safe database access with Drizzle ORM. Supports multiple databases.",
    link: "https://orm.drizzle.team/",
  },
  {
    name: "Zod",
    description:
      "Schema validation and parsing with Zod. Type-safe validation for forms and API requests.",
    link: "https://zod.dev/",
  },
  {
    name: "Shadcn",
    description:
      "UI components and design system with Shadcn. Beautiful and accessible components.",
    link: "https://ui.shadcn.com/",
  },
] as const;

export default function StackList() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [lastInRowIndices, setLastInRowIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const detectLastInRows = () => {
      const positions = itemRefs.current.map((el) => el?.offsetTop ?? 0);
      const newLastIndices = new Set<number>();

      for (let i = 0; i < positions.length; i++) {
        const currentTop = positions[i];
        const nextTop = positions[i + 1];

        if (nextTop !== undefined && currentTop !== nextTop) {
          newLastIndices.add(i); // Last in its row
        }
      }

      // Ensure the last item is always considered a row-end
      if (positions.length > 0) {
        newLastIndices.add(positions.length - 1);
      }

      setLastInRowIndices(newLastIndices);
    };

    detectLastInRows();
    window.addEventListener("resize", detectLastInRows);
    return () => window.removeEventListener("resize", detectLastInRows);
  }, [stack]);

  return (
    <ul className="flex flex-wrap justify-center text-sm gap-2 max-w-[80ch]">
      {stack.map((item, index) => (
        <li
          key={item.name}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className="flex items-center gap-2"
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus:underline"
          >
            {item.name}
          </a>
          {!lastInRowIndices.has(index) && <Dot />}
        </li>
      ))}
    </ul>
  );
}
