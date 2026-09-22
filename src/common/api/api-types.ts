import z from "zod";

export const problemDetailsSchema = z.object({
  type: z.string().optional(),
  title: z.string(),
  status: z.coerce.number(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  traceId: z.string().optional(),
  timestamp: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
