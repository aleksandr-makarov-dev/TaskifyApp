import { queryOptions, useQuery } from "@tanstack/react-query";
import type { QueryConfig } from "../../../common/lib/react-query";
import type { GetItemsQueryParams, ItemResponse } from "../types";
import type { ProblemDetails } from "../../../common/api/api-types";
import { getItemsAsync } from "../api";

type UseGetItemsOptions = {
  query?: GetItemsQueryParams;
} & QueryConfig<typeof getItemsQueryOptions>;

export const getItemsQueryOptions = (query: GetItemsQueryParams = {}) => {
  return queryOptions<ItemResponse[], ProblemDetails>({
    queryKey: ["items"],
    queryFn: () => getItemsAsync(query),
  });
};

export function useGetItemsQuery({
  query = {},
  ...queryConfig
}: UseGetItemsOptions = {}) {
  return useQuery({
    ...getItemsQueryOptions(query),
    ...queryConfig,
  });
}
