import { Field as BaseField } from "@base-ui/react/field";
import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = Omit<
  ControllerProps<TFieldValues, TName, TTransformedValues>,
  "control" | "render"
> & {
  control: Control<TFieldValues, any, TTransformedValues>;
  label: ReactNode;
  description?: ReactNode;
  render: ControllerProps<TFieldValues, TName, TTransformedValues>["render"];
};

export function Field<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  label,
  description,
  render,
  control,
  ...props
}: FieldProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      {...props}
      control={control}
      render={({ field, fieldState, formState }) => (
        <BaseField.Root
          invalid={fieldState.invalid}
          dirty={fieldState.isDirty}
          touched={fieldState.isTouched}
          className="flex w-full flex-col items-start gap-1"
        >
          <BaseField.Label className="text-sm text-neutral-950 dark:text-white">
            {label}
          </BaseField.Label>

          {render({ field, fieldState, formState })}

          <BaseField.Error
            match={fieldState.invalid}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {fieldState.error?.message}
          </BaseField.Error>

          {description && (
            <BaseField.Description className="text-xs text-neutral-500 dark:text-neutral-400">
              {description}
            </BaseField.Description>
          )}
        </BaseField.Root>
      )}
    />
  );
}
