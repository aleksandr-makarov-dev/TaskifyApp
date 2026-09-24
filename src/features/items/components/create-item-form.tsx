import { useForm, type SubmitHandler } from "react-hook-form";
import { createItemInputSchema, type CreateItemRequest } from "../types";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/common/components/field";
import Input from "@/common/components/input";
import Textarea from "@/common/components/text-area";
import type { SelectItem } from "@/common/components/select";
import Select from "@/common/components/select";

type CreateItemFormProps = {
  formId: string;
  defaultValues: CreateItemRequest;
  onSubmit: SubmitHandler<CreateItemRequest>;
};

export function CreateItemForm({
  formId,
  defaultValues,
  onSubmit,
}: CreateItemFormProps) {
  const { t } = useTranslation();

  const form = useForm<CreateItemRequest>({
    resolver: zodResolver(createItemInputSchema),
    defaultValues,
  });

  const priorityItems: SelectItem<string>[] = [
    { label: t("priority.low"), value: "1" },
    { label: t("priority.medium"), value: "2" },
    { label: t("priority.high"), value: "3" },
    { label: t("priority.critical"), value: "4" },
  ];

  return (
    <form
      id={formId}
      className="space-y-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Field
        control={form.control}
        name="name"
        label={t("createForm.name")}
        render={({ field, fieldState }) => (
          <Input
            className="w-full"
            aria-invalid={fieldState.invalid}
            {...field}
          />
        )}
      />

      <Field
        control={form.control}
        name="description"
        label={t("createForm.description")}
        render={({ field, fieldState }) => (
          <Textarea
            className="w-full"
            aria-invalid={fieldState.invalid}
            {...field}
          />
        )}
      />

      <Field
        control={form.control}
        name="priority"
        label={t("createForm.priority")}
        render={({ field, fieldState }) => (
          <Select
            className="w-full"
            aria-invalid={fieldState.invalid}
            items={priorityItems}
            value={field.value}
            disabled={field.disabled}
            onValueChange={field.onChange}
          />
        )}
      />

      <Field
        control={form.control}
        name="dueDateOnUtc"
        label={t("createForm.dueDate")}
        render={({ field, fieldState }) => (
          <Input
            className="w-full"
            type="datetime-local"
            aria-invalid={fieldState.invalid}
            {...field}
          />
        )}
      />
    </form>
  );
}
