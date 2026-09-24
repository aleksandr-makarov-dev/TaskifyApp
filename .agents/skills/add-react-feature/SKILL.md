---
name: add-react-feature
description: Add or substantially extend a domain feature in Taskify using the repository's established React, TanStack Query, React Hook Form, Zod, i18next and shared UI patterns. Supports both dialog-based interactions and dedicated route pages. Use for new domain features, CRUD flows, create/edit forms, and standalone feature pages; do not use for small isolated UI changes.
---

---

# Add a React feature

Implement new feature functionality using the repository's existing architecture.

Do not blindly generate a fixed folder structure.

Inspect the task and existing repository first, then create only what is necessary.

---

## 1. Determine the interaction type

Before implementing UI, determine which existing interaction pattern fits the requested behavior.

There are two primary patterns.

### Dialog interaction

Use when the requested action happens inside the current page without navigation.

Examples:

- create item;
- edit item;
- confirm destructive action;
- configure an entity from an existing page.

Primary reference:

```text
src/features/items/components/create-item-dialog.tsx
src/features/items/components/create-item-form.tsx
```

### Dedicated page

Use when the requested feature needs its own URL or represents a standalone workflow.

Examples:

- registration;
- login;
- settings page;
- entity details page;
- complex creation wizard.

Primary structural reference:

```text
src/routes/auth/register.tsx
src/features/auth/components/register-user-form.tsx
```

Do not create both a dialog and page unless the task actually requires both.

---

# 2. Inspect relevant existing code

Before implementation, inspect:

```text
package.json

src/common/api/api-client.ts
src/common/api/api-types.ts

src/common/lib/react-query.ts

src/common/components/

src/i18n.ts
src/locales/en.json
src/locales/ru.json
```

Then inspect the closest existing feature.

For dialog CRUD workflows, inspect:

```text
src/features/items
```

For standalone form pages, inspect:

```text
src/features/auth
src/routes/auth/register.tsx
```

Read only relevant code.

Do not scan unrelated parts of the repository without a reason.

---

# 3. Create or extend the feature

Feature code belongs under:

```text
src/features/<feature>/
```

Create only the layers required by the task.

Possible structure:

```text
src/features/<feature>/
├── api.ts
├── types.ts
├── components/
│   ├── create-<feature>-form.tsx
│   └── create-<feature>-dialog.tsx
└── hooks/
    ├── queries.ts
    └── mutations.ts
```

A mutation-only feature does not need meaningful query code.

A feature without dialogs does not need a dialog component.

Do not create placeholder files solely to conform to this tree.

---

# 4. Define types and schemas

Put feature domain types and form schemas in:

```text
src/features/<feature>/types.ts
```

Use Zod for runtime form validation.

Prefer deriving request types from schemas:

```ts
export const createProjectInputSchema = z.object({
  name: z.string().min(1),
});

export type CreateProjectRequest = z.infer<typeof createProjectInputSchema>;
```

Keep API response models separate when their shape differs from form/request data.

Do not duplicate types unnecessarily.

---

# 5. Implement API functions

Put feature API functions in:

```text
src/features/<feature>/api.ts
```

Use:

```ts
import { apiClient } from "@/common/api/api-client";
```

Example:

```ts
export async function createProjectAsync(
  request: CreateProjectRequest,
): Promise<ProjectResponse> {
  return apiClient.post("/projects", request);
}
```

Keep HTTP calls outside React components.

Do not create another Axios client.

---

# 6. Add queries when required

Put query definitions in:

```text
src/features/<feature>/hooks/queries.ts
```

Prefer reusable query option factories:

```ts
export const getProjectsQueryOptions = (query: GetProjectsQueryParams = {}) => {
  return queryOptions<ProjectResponse[], ProblemDetails>({
    queryKey: ["projects", query],
    queryFn: () => getProjectsAsync(query),
  });
};
```

Only include query arguments in the key when they affect returned data.

Expose hooks when UI code needs them.

Reuse the project's `QueryConfig` type where appropriate.

---

# 7. Add mutations

Put mutations in:

```text
src/features/<feature>/hooks/mutations.ts
```

Keep the generic mutation hook thin:

```ts
type UseCreateProjectOptions = MutationConfig<typeof createProjectAsync>;

export function useCreateProjectMutation(options?: UseCreateProjectOptions) {
  return useMutation({
    ...options,
    mutationFn: createProjectAsync,
  });
}
```

Do not put page-specific navigation or dialog-specific closing behavior inside the generic mutation hook.

Those behaviors belong to the orchestration boundary.

---

# 8. Create the feature form

Put reusable forms in:

```text
src/features/<feature>/components/
```

Use the existing form contract when suitable:

```ts
type CreateProjectFormProps = {
  formId: string;
  defaultValues: CreateProjectRequest;
  onSubmit: SubmitHandler<CreateProjectRequest>;
};
```

Use:

```ts
const form = useForm<CreateProjectRequest>({
  resolver: zodResolver(createProjectInputSchema),
  defaultValues,
});
```

Reuse shared:

```text
Field
Input
Textarea
Select
Checkbox
```

Use `aria-invalid` when applicable.

Example:

```tsx
<Field
  control={form.control}
  name="name"
  label={t("projects.createForm.name")}
  render={({ field, fieldState }) => (
    <Input className="w-full" aria-invalid={fieldState.invalid} {...field} />
  )}
/>
```

Keep mutation orchestration outside the form itself.

---

# 9. Localize new UI

All new user-facing UI text must use the existing i18next setup.

Use:

```ts
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
```

Do not introduce hardcoded user-facing strings in new feature UI when they can be translated.

Add translations to both:

```text
src/locales/en.json
src/locales/ru.json
```

Keep both locale structures synchronized.

For a new substantial feature, prefer keys grouped under the feature.

Example:

```json
{
  "projects": {
    "createForm": {
      "name": "Name",
      "description": "Description"
    },
    "createDialog": {
      "title": "Create project",
      "description": "Enter project details.",
      "submit": "Create",
      "close": "Cancel"
    }
  }
}
```

and the equivalent Russian structure.

Do not copy hardcoded strings from older routes as a localization pattern.

---

# 10A. Dialog workflow

Use this section when the interaction belongs in a dialog.

The feature should normally contain:

```text
components/
├── create-<feature>-dialog.tsx
└── create-<feature>-form.tsx
```

The dialog owns:

- `useTranslation`;
- feature mutation;
- `useQueryClient` when invalidation is needed;
- default form values;
- pending submission state;
- relevant query invalidation;
- closing itself after success.

Example architecture:

```ts
export function CreateProjectDialog({
  handle,
}: CreateProjectDialogProps) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const createProjectMutation = useCreateProjectMutation();

  function handleSubmit(data: CreateProjectRequest) {
    createProjectMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getProjectsQueryOptions().queryKey,
        });

        handle.close();
      },
    });
  }

  return (
    <Dialog handle={handle}>
      <DialogPopup>
        ...
      </DialogPopup>
    </Dialog>
  );
}
```

Use the shared dialog primitives:

```text
Dialog
DialogPopup
DialogHeader
DialogTitle
DialogDescription
DialogContent
DialogFooter
DialogClose
```

Use a stable form ID.

The submit button may live in `DialogFooter` outside the `<form>` by using:

```tsx
<Button
  type="submit"
  form={formId}
>
```

Disable it during the mutation:

```tsx
disabled={mutation.isPending}
```

The cancel action should normally use:

```tsx
<DialogClose>
  <Button variant="secondary">...</Button>
</DialogClose>
```

## Integrating the dialog into a route

The route should create the handle:

```ts
const createProjectDialogHandle = createDialogHandle();
```

Open it from the trigger:

```tsx
<Button onClick={() => createProjectDialogHandle.open(null)}>
  {t("projects.actions.create")}
</Button>
```

Render the dialog:

```tsx
<CreateProjectDialog handle={createProjectDialogHandle} />
```

Do not duplicate the mutation in the route when the dialog already owns the interaction.

---

# 10B. Dedicated-page workflow

Use this section when the feature needs its own route.

Create the route under:

```text
src/routes/
```

Example:

```text
src/routes/projects/create.tsx
```

The route owns:

- page layout;
- feature mutation usage;
- submit orchestration;
- success navigation if required;
- page-level feedback;
- page-specific composition.

The feature form remains under:

```text
src/features/<feature>/components/
```

Example:

```ts
const formId = "CREATE_PROJECT_FORM";

function RouteComponent() {
  const mutation = useCreateProjectMutation();

  function handleSubmit(data: CreateProjectRequest) {
    mutation.mutate(data, {
      onSuccess: () => {
        // route-specific success behavior
      },
    });
  }

  return (
    <>
      <CreateProjectForm
        formId={formId}
        defaultValues={...}
        onSubmit={handleSubmit}
      />

      <Button
        type="submit"
        form={formId}
        disabled={mutation.isPending}
      >
        {t("projects.create.submit")}
      </Button>
    </>
  );
}
```

Do not put page layout inside the feature form.

Do not make the feature form responsible for routing/navigation.

Use the existing registration page as a structural example, but localize all new user-facing text.

---

# 11. Query invalidation

When a mutation changes server data used by existing queries, invalidate the relevant query.

Prefer:

```ts
queryClient.invalidateQueries({
  queryKey: getProjectsQueryOptions().queryKey,
});
```

over manually repeating:

```ts
["projects"];
```

when a reusable query options factory already exists.

Do not invalidate unrelated application queries.

For dialog creation flows, perform invalidation before closing when that matches the existing pattern.

---

# 12. Shared UI

Before building a component, inspect:

```text
src/common/components
```

Reuse existing UI primitives.

Use Tailwind CSS.

Use `cn` for conditional classes.

Do not introduce another UI framework.

Do not add another form library.

Do not create feature-local versions of generic controls such as buttons or inputs unless they provide actual domain behavior.

---

# 13. Routing

Use TanStack Router file-based routes.

Never manually edit:

```text
src/routeTree.gen.ts
```

Create or modify files under:

```text
src/routes
```

and allow the route tree to regenerate.

---

# 14. Keep changes scoped

Do not:

- refactor unrelated features;
- translate the entire existing application unless requested;
- reorganize all translation keys;
- upgrade unrelated packages;
- rewrite common components unnecessarily;
- change generated files manually;
- add dependencies without need.

If an existing nearby implementation has an obvious defect, do not blindly copy that defect.

---

# 15. Validate

Run:

```bash
npm run lint
npm run build
```

Fix failures introduced by the feature.

There is currently no automated test command configured.

Do not claim that tests were run unless test infrastructure exists.

---

# 16. Review before finishing

Verify that:

- the correct dialog/page pattern was selected;
- feature domain logic lives under `src/features`;
- standalone page composition lives under `src/routes`;
- dialogs own their dialog-specific orchestration;
- forms remain reusable;
- API calls use the shared API client;
- server state uses TanStack Query;
- affected queries are invalidated correctly;
- mutation pending state is handled;
- existing shared UI components are reused;
- new user-facing strings use `useTranslation`;
- both `en.json` and `ru.json` contain the new translation keys;
- `routeTree.gen.ts` was not manually edited;
- lint passes;
- build passes.

When reporting completion, mention whether the implementation used the dialog or dedicated-page pattern and list validation performed.
