import { useForm, type SubmitHandler } from "react-hook-form";
import { registerUserInputSchema, type RegisterUserRequest } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/common/components/field";
import Input from "@/common/components/input";

type RegisterUserFormProps = {
  formId: string;
  defaultValues: RegisterUserRequest;
  onSubmit: SubmitHandler<RegisterUserRequest>;
};

export function RegisterUserForm({
  formId,
  defaultValues,
  onSubmit,
}: RegisterUserFormProps) {
  const form = useForm<RegisterUserRequest>({
    resolver: zodResolver(registerUserInputSchema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      className="space-y-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Field
        control={form.control}
        name="email"
        label="Email"
        render={({ field }) => <Input className="w-full" {...field} />}
      />
      <Field
        control={form.control}
        name="password"
        label="Password"
        render={({ field }) => (
          <Input type="password" className="w-full" {...field} />
        )}
      />
    </form>
  );
}
