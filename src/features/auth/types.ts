import z from "zod";

export const registerUserInputSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type RegisterUserRequest = z.infer<typeof registerUserInputSchema>;
