import type { MutationConfig } from "@/common/lib/react-query";
import { registerUserAsync } from "../api";
import { useMutation } from "@tanstack/react-query";

type UseRegisterUserOptions = MutationConfig<typeof registerUserAsync>;

export function useRegisterUserMutation(options?: UseRegisterUserOptions) {
  return useMutation({
    ...options,
    mutationFn: registerUserAsync,
  });
}
