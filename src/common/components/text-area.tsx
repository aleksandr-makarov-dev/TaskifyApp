import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export default function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-20 min-w-40 resize-y border border-neutral-500 px-1.5 py-1 text-sm font-normal text-neutral-950 placeholder:text-neutral-500 focus:outline-1 focus:-outline-offset-1 focus:outline-sky-600 any-pointer-coarse:text-base dark:border-white dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-400 dark:focus:outline-white",
        className,
      )}
      {...props}
    />
  );
}
