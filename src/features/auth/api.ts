import { apiClient } from "@/common/api/api-client";
import type { RegisterUserRequest } from "./types";

export async function registerUserAsync(
  data: RegisterUserRequest,
): Promise<void> {
  return await apiClient.post("/users/register", data);
}
