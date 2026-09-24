import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentProps, ReactElement } from "react";
import { cn } from "../lib/cn";

export function Dialog(props: ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root disablePointerDismissal {...props} />;
}

type DialogTriggerProps = Omit<
  ComponentProps<typeof BaseDialog.Trigger>,
  "render" | "children"
> & {
  children: ReactElement;
};

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return <BaseDialog.Trigger render={children} {...props} />;
}

export function DialogPopup({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 bg-black opacity-20 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 dark:opacity-50 supports-[-webkit-touch-callout:none]:absolute" />

      <BaseDialog.Viewport className="fixed inset-0 flex items-center justify-center overflow-hidden py-6 [@media(min-height:600px)]:pt-8 [@media(min-height:600px)]:pb-12">
        <BaseDialog.Popup
          className={cn(
            "relative flex max-h-full min-h-0 w-[min(40rem,calc(100vw-2rem))] max-w-full flex-col border border-neutral-500 bg-white text-neutral-950 shadow-[0.25rem_0.25rem_0] shadow-black/12 transition-[scale,opacity] duration-100 ease-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0 dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none",
            className,
          )}
          {...props}
        />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col items-start gap-1 p-3 pb-1.5", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn("text-base font-medium", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      className={cn(
        "text-sm text-neutral-600 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-3 py-1.5", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 justify-end gap-2 p-3 pt-1.5", className)}
      {...props}
    />
  );
}

type DialogCloseProps = Omit<
  ComponentProps<typeof BaseDialog.Close>,
  "render" | "children"
> & {
  children: ReactElement;
};

export function DialogClose({ children, ...props }: DialogCloseProps) {
  return <BaseDialog.Close render={children} {...props} />;
}

export const createDialogHandle = BaseDialog.createHandle;
export type DialogHandle<Payload = unknown> = BaseDialog.Handle<Payload>;
