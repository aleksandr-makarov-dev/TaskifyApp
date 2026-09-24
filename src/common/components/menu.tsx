import type { ComponentProps, ReactElement } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "../lib/cn";
import Button from "./button";

export function Menu<Payload>({
  children,
  ...props
}: ComponentProps<typeof BaseMenu.Root<Payload>>) {
  return <BaseMenu.Root {...props}>{children}</BaseMenu.Root>;
}

export function MenuContent({
  children,
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Popup>) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="z-10 outline-hidden"
        sideOffset={4}
        align="start"
      >
        <BaseMenu.Popup
          {...props}
          className={cn(
            "relative min-w-32 origin-(--transform-origin) border border-neutral-500 bg-white py-1 text-neutral-950 shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-hidden transition-[scale,opacity] duration-100 ease-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0 dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuItem({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Item>) {
  return (
    <BaseMenu.Item
      {...props}
      className={cn(
        "flex h-7 cursor-pointer items-center px-2.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:text-neutral-400 data-highlighted:bg-sky-100 data-highlighted:text-sky-950 dark:data-disabled:text-neutral-600 dark:data-highlighted:bg-sky-900 dark:data-highlighted:text-sky-100",
        className,
      )}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      {...props}
      className={cn(
        "mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800",
        className,
      )}
    />
  );
}

type MenuTriggerProps<Payload> = Omit<
  ComponentProps<typeof BaseMenu.Trigger<Payload>>,
  "render" | "children"
> & {
  children: ReactElement;
};

export function MenuTrigger<Payload>({
  children,
  ...props
}: MenuTriggerProps<Payload>) {
  return <BaseMenu.Trigger render={children} {...props} />;
}

export function EllipsisHorizontalIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <circle cx="3" cy="8" r="1" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="13" cy="8" r="1" />
    </svg>
  );
}

export function MenuButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button className={cn("size-6 border-0 p-0", className)} {...props}>
      <EllipsisHorizontalIcon className="size-4" />
    </Button>
  );
}

export const createMenuHandle = BaseMenu.createHandle;

export type MenuHandle<Payload = unknown> = BaseMenu.Handle<Payload>;
