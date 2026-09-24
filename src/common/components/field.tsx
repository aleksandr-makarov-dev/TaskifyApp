// common/components/field.tsx

import { Field as BaseField } from "@base-ui/react/field";
import type { ReactNode } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  label: ReactNode;
  description?: ReactNode;
};

export function Field<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, description, render, ...props }: FieldProps<TFieldValues, TName>) {
  return (
    <Controller<TFieldValues, TName>
      {...props}
      render={({ field, fieldState, formState }) => (
        <BaseField.Root
          invalid={fieldState.invalid}
          dirty={fieldState.isDirty}
          touched={fieldState.isTouched}
          className="flex w-full flex-col items-start gap-1"
        >
          <BaseField.Label className="text-sm font-medium text-neutral-950 dark:text-white">
            {label}
          </BaseField.Label>

          {render({
            field,
            fieldState,
            formState,
          })}

          <BaseField.Error
            match={fieldState.invalid}
            className="text-sm text-red-700 dark:text-red-400"
          >
            {fieldState.error?.message}
          </BaseField.Error>

          {description && (
            <BaseField.Description className="text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </BaseField.Description>
          )}
        </BaseField.Root>
      )}
    />
  );
}
