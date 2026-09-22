import { createFileRoute } from "@tanstack/react-router";
import {
  getItemsQueryOptions,
  useGetItemsQuery,
} from "../features/items/hooks/queries";
import { formatDate } from "../common/lib/format-date";
import { formatPriority } from "../common/lib/format-priority";
import type { CreateItemRequest } from "../features/items/types";
import { useCreateItemMutation } from "../features/items/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const getItemsQuery = useGetItemsQuery();
  const createItemMutation = useCreateItemMutation({
    onSuccess: (_) =>
      queryClient.invalidateQueries({
        queryKey: getItemsQueryOptions({}).queryKey,
      }),
  });

  const handleClick = () => {
    const item = {
      name: "Test name " + Math.random(),
      description: "Test description",
      priority: 1,
      DueDateOnUtc: dayjs().add(30, "minute").toDate(),
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

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={handleClick}>Click me</button>
      <table className="border-collapse">
        <thead>
          <tr className="bg-neutral-100">
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Name
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Priority
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Due Date
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Completed
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Completion Date
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Overdue
            </th>
            <th className="px-2 py-1 border-neutral-300 border font-medium">
              Overdue Date
            </th>
          </tr>
        </thead>
        <tbody>
          {getItemsQuery.data?.map((item) => (
            <tr key={item.id}>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.name}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {formatPriority(item.priority)}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.dueDateOnUtc && formatDate(item.dueDateOnUtc)}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.isComplete ? "Yes" : "No"}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.completedAtUtc && formatDate(item.completedAtUtc)}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.isExpired ? "Yes" : "No"}
              </td>
              <td className="px-2 py-1 border-neutral-300 border">
                {item.expiredAtUtc && formatDate(item.expiredAtUtc)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
