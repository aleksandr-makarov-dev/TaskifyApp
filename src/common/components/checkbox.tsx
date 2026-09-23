import * as React from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "../lib/cn";

export default function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      defaultChecked
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-none border border-neutral-400 bg-white p-0 text-white data-checked:border-sky-600 data-checked:bg-sky-600 data-checked:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:border-white dark:bg-sky-600 dark:text-sky-600 dark:data-checked:bg-white dark:data-checked:text-sky-600 dark:focus-visible:outline-white",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex data-unchecked:hidden">
        <CheckIcon />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
