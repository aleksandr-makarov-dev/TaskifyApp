import { createFileRoute } from "@tanstack/react-router";
import {
  getItemsQueryOptions,
  useGetItemsQuery,
} from "../features/items/hooks/queries";
import { formatDate } from "../common/lib/format-date";
import { formatPriority } from "../common/lib/format-priority";
import {
  createItemInputSchema,
  type CreateItemRequest,
} from "../features/items/types";
import { useCreateItemMutation } from "../features/items/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/common/components/table";
import Checkbox from "@/common/components/checkbox";
import { Menu } from "@base-ui/react/menu";
import Input from "@/common/components/input";
import Button from "@/common/components/button";
import Select, { type SelectItem } from "@/common/components/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/common/components/field";
import Textarea from "@/common/components/text-area";

export const Route = createFileRoute("/")({
  component: Index,
});

const menuHandle = Menu.createHandle();

const priorityItems: SelectItem<string>[] = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
  { label: "Critical", value: "4" },
];

function Index() {
  const queryClient = useQueryClient();
  const getItemsQuery = useGetItemsQuery();
  const createItemMutation = useCreateItemMutation({
    onSuccess: (_) =>
      queryClient.invalidateQueries({
        queryKey: getItemsQueryOptions({}).queryKey,
      }),
  });

  const form = useForm<CreateItemRequest>({
    resolver: zodResolver(createItemInputSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "1",
      dueDateOnUtc: dayjs().toDate().toDateString(),
    },
  });

  const handleClick = () => {
    const item = {
      name: "Test name " + Math.random(),
      description: "Test description",
      priority: "1",
      dueDateOnUtc: dayjs().add(30, "minute").toDate().toDateString(),
    } satisfies CreateItemRequest;

    createItemMutation.mutate(item, {
      onSuccess: (response) => {
        console.log("CreateItemSuccess:", JSON.stringify(response, null, 2));
      },
      onError: (error) => {
        console.error("CreateItemError:", JSON.stringify(error, null, 2));
      },
    });
  };

  const onFormSubmit = (data: CreateItemRequest) => {
    console.log("FormData:", data);
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={handleClick}>Click me</button>
      <div className="space-y-2">
        <div className="flex flex-row gap-x-2">
          <Input className="w-64" placeholder="Search" />
          <Button>Export</Button>
          <Button variant="secondary">Secondary</Button>
          <Select placeholder="Priority" items={priorityItems} />
          <Select
            className="max-w-40 w-full"
            multiple
            placeholder="Priority"
            items={priorityItems}
          />
          <Dialog>
            <DialogTrigger>
              <Button variant="secondary">Create task</Button>
            </DialogTrigger>
            <DialogPopup>
              <DialogHeader>
                <div className="min-w-0 flex-1">
                  <DialogTitle>Create new task</DialogTitle>
                  <DialogDescription>Create a new task.</DialogDescription>
                </div>
              </DialogHeader>
              <DialogContent>
                <form
                  id="create-task-form"
                  className="space-y-2"
                  onSubmit={form.handleSubmit(onFormSubmit)}
                >
                  <Field
                    control={form.control}
                    name="name"
                    label="Name"
                    render={({ field }) => (
                      <Input className="w-full" {...field} />
                    )}
                  />
                  <Field
                    control={form.control}
                    name="description"
                    label="Description"
                    render={({ field }) => (
                      <Textarea className="w-full" rows={16} {...field} />
                    )}
                  />
                  <Field
                    control={form.control}
                    name="priority"
                    label="Priority"
                    render={({ field }) => (
                      <Select
                        className="w-full"
                        placeholder="Priority"
                        items={priorityItems}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </form>
              </DialogContent>
              <DialogFooter>
                <Button type="submit" form="create-task-form">
                  Submit
                </Button>
                <DialogClose>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                <Checkbox />
              </TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Due date</TableHeaderCell>
              <TableHeaderCell>Is complete</TableHeaderCell>
              <TableHeaderCell>Completed at</TableHeaderCell>
              <TableHeaderCell>Is expired</TableHeaderCell>
              <TableHeaderCell>Expired at</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getItemsQuery.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatPriority(item.priority)}</TableCell>
                <TableCell>
                  {item.dueDateOnUtc && formatDate(item.dueDateOnUtc)}
                </TableCell>
                <TableCell className="text-center">
                  {item.isComplete ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {item.completedAtUtc && formatDate(item.completedAtUtc)}
                </TableCell>
                <TableCell className="text-center">
                  {item.isExpired ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {item.expiredAtUtc && formatDate(item.expiredAtUtc)}
                </TableCell>
                <TableCell className="px-2">
                  <Menu.Trigger
                    handle={menuHandle}
                    aria-label="Project actions"
                    className="flex size-6 items-center justify-center rounded-none text-neutral-950 select-none hover:not-data-disabled:bg-neutral-100 active:not-data-disabled:bg-neutral-200 data-pressed:bg-neutral-100 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:not-data-disabled:bg-neutral-800 dark:active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 dark:data-disabled:border-neutral-500 dark:data-disabled:text-neutral-400 dark:data-pressed:bg-neutral-800 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white"
                  >
                    <EllipsisHorizontalIcon />
                  </Menu.Trigger>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function EllipsisHorizontalIcon(props: React.ComponentProps<"svg">) {
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
