import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "../lib/cn";

export type SelectItem<Value extends string = string> = {
  label: string;
  value: Value;
};

type SelectProps<
  Value extends string,
  Multiple extends boolean | undefined = false,
> = Omit<BaseSelect.Root.Props<Value, Multiple>, "items" | "children"> & {
  items: SelectItem<Value>[];
  placeholder?: string;
  className?: string;
};

export default function Select<
  Value extends string,
  Multiple extends boolean | undefined = false,
>({
  items,
  placeholder = "Select...",
  className,
  multiple,
  ...props
}: SelectProps<Value, Multiple>) {
  return (
    <BaseSelect.Root items={items} multiple={multiple} {...props}>
      <BaseSelect.Trigger
        className={cn(
          "flex h-7 min-w-40 items-center justify-between gap-3 border border-neutral-500 bg-white px-1.5 text-sm font-normal text-neutral-950 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sky-600 data-pressed:border-sky-600 disabled:border-neutral-300 disabled:text-neutral-500 dark:border-white dark:bg-neutral-950 dark:text-white dark:focus-visible:outline-sky-400",
          className,
        )}
      >
        <BaseSelect.Value
          className="min-w-0 flex-1 truncate text-left data-placeholder:text-neutral-500 dark:data-placeholder:text-neutral-400"
          placeholder={placeholder}
        />
        <BaseSelect.Icon>
          <CaretUpDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="z-10 select-none outline-hidden"
          sideOffset={4}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="min-w-(--anchor-width) border border-neutral-500 bg-white text-neutral-950 outline-hidden dark:border-white dark:bg-neutral-950 dark:text-white">
            <BaseSelect.ScrollUpArrow className="top-0 z-1 flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute data-[side=none]:before:-top-full before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950">
              <CaretUpIcon />
            </BaseSelect.ScrollUpArrow>
            <BaseSelect.List className="relative max-h-(--available-height) overflow-y-auto py-1">
              {items.map(({ label, value }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className="group/item grid h-7 cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 pr-4 pl-2.5 text-sm outline-none select-none data-highlighted:bg-sky-100 data-highlighted:text-sky-950 dark:data-highlighted:bg-sky-900 dark:data-highlighted:text-sky-100"
                >
                  <span className="col-start-1 flex size-4 shrink-0 items-center justify-center border border-neutral-500 bg-white text-white group-data-selected/item:border-sky-600 group-data-selected/item:bg-sky-600 dark:border-neutral-500 dark:bg-neutral-950 dark:group-data-selected/item:border-sky-500 dark:group-data-selected/item:bg-sky-500">
                    <BaseSelect.ItemIndicator>
                      <CheckIcon />
                    </BaseSelect.ItemIndicator>
                  </span>

                  <BaseSelect.ItemText className="col-start-2">
                    {label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
            <BaseSelect.ScrollDownArrow className="bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full dark:bg-neutral-950">
              <CaretDownIcon />
            </BaseSelect.ScrollDownArrow>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function CaretUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function CaretUpIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M12 10H4l4-4.5z" />
    </svg>
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
