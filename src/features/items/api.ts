import { apiClient } from "../../common/api/api-client";
import type {
  CreateItemRequest,
  GetItemsQueryParams,
  ItemResponse,
} from "./types";

export async function getItemsAsync(
  params: GetItemsQueryParams,
): Promise<ItemResponse[]> {
  return apiClient.get("/items", { params });
}

export async function createItemAsync(
  request: CreateItemRequest,
): Promise<ItemResponse> {
  return apiClient.post("/items", request);
}
