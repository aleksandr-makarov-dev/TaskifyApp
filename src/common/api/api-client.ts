import Axios from "axios";
import { problemDetailsSchema, type ProblemDetails } from "./api-types";

export const apiClient = Axios.create({
  baseURL: "http://localhost:5264/api/v1",
});

apiClient.interceptors.request.use((request) => {
  if (request.headers) {
    request.headers.Accept = "application/json";
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (Axios.isAxiosError(error)) {
      const parseResult = problemDetailsSchema.safeParse(error.response?.data);

      if (parseResult.success) {
        return Promise.reject(parseResult.data);
      }

      // fallback if the response body does not match ProblemDetails
      return Promise.reject({
        title: "An unexpected error occurred",
        status: error.response?.status ?? 500,
        detail:
          typeof error.response?.data === "string"
            ? error.response.data
            : error.message,
      } satisfies ProblemDetails);
    }

    return Promise.reject({
      title: "An unexpected error occurred",
      status: 500,
      detail: "Something went wrong.",
    } satisfies ProblemDetails);
  },
);
