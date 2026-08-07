import { z } from "zod";

// Base schema = what the user inputs
export const taskInputSchema = z.object({
  title: z.string().trim().min(1, "Title field is required"),
  description: z.string().trim().min(1, "Description field is required"),
});

// Create = just the input
export const createTaskSchema = taskInputSchema;

// Update = input + id + maybe partial
export const updateTaskSchema = taskInputSchema.extend({
  id: z.string().uuid("Invalid task id"), // UUID validation
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;