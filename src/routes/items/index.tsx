import { createFileRoute } from "@tanstack/react-router";
import { useGetItemsQuery } from "../../features/items/hooks/queries";
import { formatDate } from "../../common/lib/format-date";
import { formatPriority } from "../../common/lib/format-priority";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/common/components/table";
import Checkbox from "@/common/components/checkbox";
import Input from "@/common/components/input";
import Button from "@/common/components/button";
import Select, { type SelectItem } from "@/common/components/select";
import {
  createMenuHandle,
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@/common/components/menu";
import { CreateItemDialog } from "@/features/items/components/create-item-dialog";
import { createDialogHandle } from "@/common/components/dialog";
import React from "react";

export const Route = createFileRoute("/items/")({
  component: Index,
});

const menuHandle = createMenuHandle();

const createItemDialogHandle = createDialogHandle();

const priorityItems: SelectItem<string>[] = [
  { label: "Low", value: "1" },
  { label: "Medium", value: "2" },
  { label: "High", value: "3" },
  { label: "Critical", value: "4" },
];

function Index() {
  const getItemsQuery = useGetItemsQuery();

  return (
    <React.Fragment>
      <div className="flex min-h-dvh flex-row gap-x-2 p-2">
        <main className="min-w-0 flex-1 space-y-2">
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
            <Button onClick={() => createItemDialogHandle.open(null)}>
              Create item
            </Button>
          </div>
          <Table className="w-full">
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
                  <TableCell className="w-4">
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
                  <TableCell className="px-2 w-4">
                    <MenuTrigger
                      className="size-6 border-none p-0"
                      handle={menuHandle}
                    >
                      <MenuButton variant="secondary" />
                    </MenuTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>

      <Menu handle={menuHandle}>
        <MenuContent>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuContent>
      </Menu>

      <CreateItemDialog handle={createItemDialogHandle} />
    </React.Fragment>
  );
}
