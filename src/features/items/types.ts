import z from "zod";

export type ItemResponse = {
  id: string;
  name: string;
  priority: number;
  dueDateOnUtc: string | null;
  createdAtUtc: string;
  lastModifiedAtUtc: string | null;
  isComplete: boolean;
  completedAtUtc: string | null;
  isExpired: boolean;
  expiredAtUtc: string | null;
};

export type GetItemsQueryParams = {};

export const createItemInputSchema = z.object({
  name: z.string().min(5),
  description: z.string().optional(),
  priority: z.string(),
  dueDateOnUtc: z.string(),
});

export type CreateItemRequest = z.infer<typeof createItemInputSchema>;
