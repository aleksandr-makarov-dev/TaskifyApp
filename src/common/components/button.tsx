import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "flex h-7 items-center justify-center gap-2 rounded-none border px-3 text-sm leading-none whitespace-nowrap font-normal select-none focus-visible:outline-2 focus-visible:-outline-offset-1 disabled:border-neutral-500 disabled:text-neutral-500 data-disabled:border-neutral-500 data-disabled:text-neutral-500",
  {
    variants: {
      variant: {
        primary:
          "border-sky-600 bg-sky-600 text-white hover:not-data-disabled:border-sky-700 hover:not-data-disabled:bg-sky-700 active:not-data-disabled:border-sky-800 active:not-data-disabled:bg-sky-800 dark:border-sky-500 dark:bg-sky-500 dark:hover:not-data-disabled:border-sky-400 dark:hover:not-data-disabled:bg-sky-400",
        secondary:
          "border-neutral-600 bg-white text-neutral-700 hover:not-data-disabled:bg-neutral-100 active:not-data-disabled:bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:not-data-disabled:bg-neutral-800 dark:active:not-data-disabled:bg-neutral-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants>;

export default function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
