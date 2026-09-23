import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <table className={cn("border-collapse text-sm", className)} {...props} />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      className={cn("bg-neutral-50 border border-neutral-200", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody className={cn("border border-neutral-200", className)} {...props} />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr className={cn("border border-neutral-200", className)} {...props} />
  );
}

export function TableHeaderRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("bg-neutral-100", className)} {...props} />;
}

export function TableHeaderCell({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border-y border-neutral-200 text-neutral-600 px-2 py-1.5 font-normal text-left",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-2 py-1.5 text-left", className)} {...props} />;
}
