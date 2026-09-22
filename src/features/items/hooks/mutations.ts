import { useMutation } from "@tanstack/react-query";
import type { MutationConfig } from "../../../common/lib/react-query";
import { createItemAsync } from "../api";

type UseCreateItemOptions = MutationConfig<typeof createItemAsync>;

export function useCreateItemMutation(options?: UseCreateItemOptions) {
  return useMutation({
    ...options,
    mutationFn: createItemAsync,
  });
}
