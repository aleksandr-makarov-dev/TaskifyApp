import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Sidebar({ className, ...props }: ComponentProps<"aside">) {
  return (
    <aside
      className={cn(
        "flex h-[calc(100dvh-1rem)] w-48 shrink-0 flex-col border-r border-neutral-200 bg-white text-neutral-950 dark:border-white dark:bg-neutral-950 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center border-b border-neutral-200 px-3 dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarContent({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      className={cn("min-h-0 flex-1 overflow-y-auto p-2", className)}
      {...props}
    />
  );
}

export function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

export function SidebarGroupLabel({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

type SidebarItemProps = ComponentProps<"button"> & {
  active?: boolean;
};

export function SidebarItem({ active, className, ...props }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-7 w-full cursor-pointer items-center px-2 text-left text-sm outline-none select-none hover:bg-sky-100 hover:text-sky-950 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sky-600 disabled:pointer-events-none disabled:text-neutral-400 dark:hover:bg-sky-900 dark:hover:text-sky-100 dark:focus-visible:outline-sky-400",
        active &&
          "bg-sky-100 font-medium text-sky-950 dark:bg-sky-900 dark:text-sky-100",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarSeparator({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("my-2 h-px bg-neutral-200 dark:bg-neutral-800", className)}
      {...props}
    />
  );
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto shrink-0 border-t border-neutral-200 p-2 dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
