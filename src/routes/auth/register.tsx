import Button from "@/common/components/button";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetHeader,
  FieldsetLegend,
} from "@/common/components/fieldset";
import { RegisterUserForm } from "@/features/auth/components/register-user-form";
import { useRegisterUserMutation } from "@/features/auth/hooks/mutations";
import type { RegisterUserRequest } from "@/features/auth/types";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

const formId = "REGISTER_USER_FORM";

function RouteComponent() {
  const registerUserMutation = useRegisterUserMutation();

  function handleSubmit(data: RegisterUserRequest) {
    registerUserMutation.mutate(data, {
      onSuccess: () => {
        console.log("User successfully registered.");
      },
      onError: (error) => console.log(JSON.stringify(error)),
    });
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-2">
      <main className="max-w-96 w-full">
        <Fieldset>
          <FieldsetHeader>
            <FieldsetLegend>Create new account</FieldsetLegend>
            <FieldsetDescription>
              Enter your details or continue with a provider
            </FieldsetDescription>
          </FieldsetHeader>
          <div className="space-y-2">
            <Button className="w-full" variant="secondary">
              Continue with Google
            </Button>
            <Button className="w-full" variant="secondary">
              Continue with GitHub
            </Button>
            <Button className="w-full" variant="secondary">
              Continue with Email
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              or sign up with email
            </span>
            <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
          </div>
          <RegisterUserForm
            formId={formId}
            defaultValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          />
          <Button type="submit" form={formId}>
            Create account
          </Button>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link to="/auth/register" className="text-sky-600 hover:underline">
              Sign in
            </Link>
          </p>
        </Fieldset>
      </main>
    </div>
  );
}
