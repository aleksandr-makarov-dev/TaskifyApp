import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Fieldset({
  className,
  ...props
}: ComponentProps<typeof BaseFieldset.Root>) {
  return (
    <BaseFieldset.Root
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

export function FieldsetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

export function FieldsetLegend({
  className,
  ...props
}: ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend
      className={cn(
        "text-base font-medium text-neutral-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}

export function FieldsetDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}
