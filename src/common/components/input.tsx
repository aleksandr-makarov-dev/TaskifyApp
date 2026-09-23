import { Input as BaseInput } from "@base-ui/react/input";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export default function Input({
  className,
  ...props
}: ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      className={cn(
        "h-7 w-auto border border-neutral-500 px-1.5 text-sm font-normal text-neutral-950 placeholder:text-neutral-500 focus:outline-1 focus:-outline-offset-1 focus:outline-sky-600 any-pointer-coarse:text-base dark:border-white dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-400 dark:focus:outline-white",
        className,
      )}
      {...props}
    />
  );
}
