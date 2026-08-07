import { z } from "zod";

export const getTasksQuerySchema = z.object({
  filter: z
    .string()
    .transform((val) => (val === "completed" ? "complete" : val)) // "completed" -> "complete" for status filtering
    .pipe(z.enum(["all", "incomplete", "complete"])), // Validate after transform
  query: z.string().trim().min(1, "Enter at least one character").optional(), // Search
});

export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;
