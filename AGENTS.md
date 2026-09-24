# Taskify Web Application

## Project

This repository contains a React + TypeScript application built with Vite.

Main technologies:

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Base UI
- Tailwind CSS
- i18next
- react-i18next
- class-variance-authority
- dayjs

Before adding a dependency, inspect `package.json` and prefer libraries already used by the project.

---

## Project structure

Application code lives under `src`.

```text
src/
├── common/
│   ├── api/
│   ├── components/
│   └── lib/
│
├── features/
│   ├── auth/
│   └── items/
│
├── locales/
│   ├── en.json
│   └── ru.json
│
├── routes/
│   ├── auth/
│   └── items/
│
├── i18n.ts
├── main.tsx
└── routeTree.gen.ts
```

Respect the existing boundaries when adding new code.

---

# Architecture

## `src/common`

`src/common` contains reusable infrastructure shared by multiple features.

### `common/api`

Contains the shared HTTP client and API-level infrastructure.

Use:

```ts
import { apiClient } from "@/common/api/api-client";
```

Do not create feature-specific Axios instances without a concrete reason.

### `common/components`

Contains reusable UI primitives.

Before creating a new UI primitive, inspect this directory.

Current components include primitives for:

- buttons;
- inputs;
- text areas;
- selects;
- checkboxes;
- dialogs;
- menus;
- tables;
- fields;
- fieldsets;
- sidebar UI.

Reuse these components instead of rebuilding equivalent controls inside a feature.

### `common/lib`

Contains shared utilities and infrastructure helpers.

Examples include:

- React Query types/configuration;
- date formatting;
- priority formatting;
- Tailwind class merging.

Do not move feature-specific business logic into `common`.

---

# Features

Domain code belongs under:

```text
src/features/<feature>/
```

A feature may contain:

```text
src/features/<feature>/
├── api.ts
├── types.ts
├── components/
└── hooks/
    ├── queries.ts
    └── mutations.ts
```

Do not create files or directories that the feature does not need.

For example, a feature with only mutations may have an empty or absent query layer.

Keep feature-specific:

- API calls;
- domain types;
- validation schemas;
- forms;
- dialogs;
- query hooks;
- mutation hooks;

inside the feature.

---

# Feature UI patterns

The project currently uses two primary patterns for feature UI.

Choose the pattern that matches the requested interaction instead of inventing a different architecture.

## Pattern A — Feature inside a dialog

Use this pattern when an action is performed without navigating away from the current page.

The reference implementation is:

```text
src/features/items/components/create-item-dialog.tsx
src/features/items/components/create-item-form.tsx
```

The route/page should normally:

1. create the dialog handle;
2. render the trigger;
3. open the dialog;
4. render the feature dialog component once.

Example architecture:

```text
route
  │
  ├── createDialogHandle()
  │
  ├── trigger
  │
  └── <CreateFeatureDialog handle={handle} />
                 │
                 ├── mutation
                 ├── query invalidation
                 ├── close behavior
                 └── feature form
```

The feature dialog owns the interaction lifecycle.

It may own:

- the mutation;
- `useQueryClient`;
- relevant query invalidation;
- pending state;
- closing the dialog after success;
- dialog translations;
- default form values.

The route should not duplicate this logic.

Example:

```ts
const createThingDialogHandle = createDialogHandle();

<Button onClick={() => createThingDialogHandle.open(null)}>
  ...
</Button>

<CreateThingDialog handle={createThingDialogHandle} />
```

The dialog should close after a successful mutation when that matches the requested UX.

Disable submission while the mutation is pending.

Invalidate only the queries affected by the mutation.

Prefer obtaining query keys from the feature's query options instead of duplicating raw query keys.

---

## Pattern B — Feature on a dedicated page

Use this pattern when the interaction represents a standalone screen with its own URL.

The reference implementation is:

```text
src/routes/auth/register.tsx
src/features/auth/components/register-user-form.tsx
```

The route owns page-level orchestration.

Typical architecture:

```text
route
  │
  ├── page layout
  ├── feature mutation
  ├── submit handler
  ├── navigation / success behavior
  │
  └── feature form
```

The feature form should remain focused on form behavior.

It should normally receive:

```ts
type FeatureFormProps = {
  formId: string;
  defaultValues: FeatureRequest;
  onSubmit: SubmitHandler<FeatureRequest>;
};
```

This keeps the form independent from whether it appears inside a route, dialog, or another container.

Page-specific layout and navigation belong to the route.

Do not move an entire page implementation into `src/features` merely to keep route files small.

Routes are allowed to contain page composition and orchestration.

---

# Forms

Use React Hook Form for application forms.

Use Zod for form/domain validation.

Connect them with:

```ts
zodResolver(...)
```

Prefer:

```text
types.ts
   │
   └── Zod schema
          │
          ▼
feature form
   │
   ├── useForm
   ├── zodResolver
   └── shared Field/components
```

Example:

```ts
const form = useForm<CreateSomethingRequest>({
  resolver: zodResolver(createSomethingInputSchema),
  defaultValues,
});
```

Use the shared:

```text
src/common/components/field.tsx
```

for controlled fields where appropriate.

Reuse existing:

```text
Input
Textarea
Select
Checkbox
Button
Field
Fieldset
```

before creating additional form primitives.

Pass:

```tsx
aria-invalid={fieldState.invalid}
```

to form controls when the existing control supports it.

For selects and other non-native controlled components, map React Hook Form values explicitly when necessary:

```tsx
<Select
  value={field.value}
  disabled={field.disabled}
  onValueChange={field.onChange}
/>
```

Keep submit handling outside the pure form component when possible.

---

# Localization

The application uses:

```text
i18next
react-i18next
```

Configuration lives in:

```text
src/i18n.ts
```

Translations currently live in:

```text
src/locales/en.json
src/locales/ru.json
```

English is the fallback language.

Language detection is handled by the existing i18n configuration.

Do not introduce another localization library.

## User-facing text

New user-facing text should be localized.

This includes:

- page titles;
- dialog titles;
- descriptions;
- form labels;
- placeholders;
- buttons;
- menu items;
- table headings;
- status labels;
- empty-state messages;
- validation messages when displayed to users.

Avoid adding raw user-facing English or Russian strings directly inside JSX.

Use:

```ts
const { t } = useTranslation();
```

and translation keys.

Example:

```tsx
<Button>{t("createItemDialog.submit")}</Button>
```

When adding a new translation key, add the corresponding key to both:

```text
src/locales/en.json
src/locales/ru.json
```

Keep both locale files structurally compatible.

Do not add a key to only one locale and rely on fallback unless explicitly requested.

## Translation key organization

Keep related translations grouped together.

Prefer feature-oriented groups for new larger feature areas.

For example:

```json
{
  "projects": {
    "create": {
      "title": "...",
      "description": "...",
      "submit": "..."
    }
  }
}
```

For small additions, follow the surrounding locale structure when consistency is more important than restructuring.

Do not rename or reorganize unrelated existing translation keys as part of a feature task.

## Existing hardcoded strings

Some existing routes still contain non-localized strings.

Do not copy those strings into new code as a localization pattern.

When modifying an existing UI area, localize newly introduced user-facing strings.

Do not perform a repository-wide localization refactor unless explicitly requested.

---

# API

Feature API functions belong in:

```text
src/features/<feature>/api.ts
```

Use the shared API client:

```ts
apiClient;
```

Keep HTTP requests out of React components.

Prefer descriptive async functions:

```ts
getItemsAsync(...)
createItemAsync(...)
registerUserAsync(...)
```

Keep request and response types under the feature.

Remember that the shared Axios response interceptor returns `response.data`.

---

# API errors

API errors use the shared `ProblemDetails` model.

Reuse:

```text
src/common/api/api-types.ts
```

and the existing Axios error normalization.

Do not invent independent API error formats inside individual feature components unless required by a different backend contract.

---

# TanStack Query

Use TanStack Query for server state.

Do not duplicate server data in local component state without a concrete reason.

## Queries

Feature queries belong in:

```text
src/features/<feature>/hooks/queries.ts
```

Prefer reusable query option factories:

```ts
export const getThingsQueryOptions = (...) => {
  return queryOptions({
    queryKey: [...],
    queryFn: ...,
  });
};
```

Then wrap them in feature hooks when needed.

Use `QueryConfig` from:

```text
src/common/lib/react-query.ts
```

when appropriate.

Query keys must contain any parameters that affect the result.

## Mutations

Feature mutations belong in:

```text
src/features/<feature>/hooks/mutations.ts
```

Keep basic mutation hooks thin.

Example:

```ts
export function useCreateThingMutation(options?: UseCreateThingOptions) {
  return useMutation({
    ...options,
    mutationFn: createThingAsync,
  });
}
```

Use `MutationConfig` when it matches the mutation.

Interaction-specific success behavior should normally live at the orchestration boundary.

For example:

- a dialog may invalidate data and close itself;
- a route may navigate after a successful registration;
- a page may show page-specific feedback.

Do not put every possible success side effect inside a generic mutation hook.

---

# Routing

Use TanStack Router file-based routing.

Routes live under:

```text
src/routes
```

Create dedicated route files when the feature requires its own URL.

Routes may contain:

- page layout;
- page composition;
- feature query usage;
- feature mutation orchestration;
- navigation;
- page-specific state.

Reusable domain behavior belongs in `src/features`.

Do not manually edit:

```text
src/routeTree.gen.ts
```

It is generated by TanStack Router.

Create or modify route files and allow the router tooling to regenerate the route tree.

---

# UI components

Use Base UI-based shared components already present in:

```text
src/common/components
```

Use Tailwind CSS for styling.

Use:

```ts
cn(...)
```

for conditional class composition.

Use `class-variance-authority` when a shared component genuinely has reusable variants.

Follow existing light/dark styling conventions.

Do not introduce another UI library or styling system without a concrete requirement.

---

# React

Use functional components and hooks.

Prefer derived values over duplicated state.

Do not use `useEffect` for values that can be derived during rendering.

Keep server state in TanStack Query.

Keep feature forms focused on form concerns.

Keep orchestration in the appropriate container:

```text
Dialog
or
Route
```

Avoid abstractions that have no current reuse or clear architectural purpose.

---

# TypeScript

Keep new application code strongly typed.

Avoid `any` unless required by an external API or library boundary.

Do not suppress TypeScript errors merely to make the build pass.

Prefer existing domain types instead of creating duplicate shapes.

Infer form input types from Zod schemas when appropriate:

```ts
type CreateThingRequest = z.infer<typeof createThingInputSchema>;
```

Respect unused-variable and unused-parameter compiler rules.

---

# Imports

The `@/*` alias maps to:

```text
src/*
```

Prefer `@/` imports when crossing feature or top-level directory boundaries.

Relative imports are acceptable inside the same feature when the files are closely related.

Do not introduce additional aliases without need.

---

# Generated files

Do not manually edit generated files.

In particular:

```text
src/routeTree.gen.ts
```

is generated by TanStack Router.

If generated output must change, modify the source route/configuration instead.

---

# Dependencies

Before adding a dependency:

1. inspect `package.json`;
2. check whether an installed dependency already solves the problem;
3. prefer existing project abstractions;
4. only add the dependency when there is a concrete benefit.

Do not upgrade unrelated dependencies while implementing a feature.

---

# Change discipline

Keep changes scoped to the requested task.

Do not:

- refactor unrelated code;
- reformat unrelated files;
- rename unrelated components;
- replace existing libraries;
- reorganize locale files unnecessarily;
- change public APIs without need;
- manually change generated files.

When fixing a bug, identify the cause before applying the fix.

Follow existing architecture, but do not blindly reproduce an obvious bug or typing issue.

---

# Reference implementations

When adding similar functionality, inspect the closest existing implementation.

## Dialog-based feature

Use:

```text
src/features/items/components/create-item-dialog.tsx
src/features/items/components/create-item-form.tsx
src/features/items/hooks/mutations.ts
src/features/items/hooks/queries.ts
```

as the primary reference for:

- dialog ownership;
- dialog handles;
- forms inside dialogs;
- mutation pending state;
- query invalidation;
- closing after success;
- localization.

## Dedicated page feature

Use:

```text
src/routes/auth/register.tsx
src/features/auth/components/register-user-form.tsx
src/features/auth/hooks/mutations.ts
```

as the structural reference for:

- dedicated page routes;
- feature forms;
- form IDs;
- external submit buttons;
- route-owned mutation orchestration.

The current registration page contains hardcoded user-facing strings.

Use it as an architectural example, not as a localization example.

---

# Adding or extending a feature

For a substantial feature task, use:

```text
.agents/skills/add-react-feature/SKILL.md
```

The skill supports both:

```text
dialog interaction
dedicated page
```

Choose the smallest pattern that satisfies the requested UX.

Do not create a dedicated page when a dialog is requested.

Do not hide a naturally standalone screen inside a dialog merely because a dialog example exists.

---

# Validation

The repository currently provides:

```bash
npm run lint
npm run build
```

Run both after meaningful source changes:

```bash
npm run lint
npm run build
```

Fix errors introduced by the change.

There is currently no configured automated test script.

Do not claim to have run tests that are not configured.

---

# Before finishing

Review the diff and verify:

- the requested behavior works;
- the correct page/dialog pattern was used;
- domain code is inside the feature;
- route code is limited to page orchestration where appropriate;
- API requests use `apiClient`;
- server state uses TanStack Query;
- mutations invalidate only relevant data;
- forms use React Hook Form and Zod where applicable;
- existing shared UI components are reused;
- new user-facing strings are localized;
- both English and Russian locale files were updated when translations changed;
- `routeTree.gen.ts` was not manually edited;
- unrelated files were not changed;
- lint passes;
- build passes.

Report any validation that could not be completed.
