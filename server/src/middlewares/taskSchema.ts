import { z } from "zod";

// Reusable pieces
const idSchema = z.string().uuid("Invalid task id");
const baseSchema = z.object({
  title: z.string().trim().min(1, "Title field is required"),
  description: z.string().trim().min(1, "Description field is required"),
});

// Create = just the input
export const createTaskSchema = baseSchema;

// Update = input + id
export const updateTaskSchema = baseSchema.extend({
  id: idSchema,
});

// Delete only needs id
export const deleteTaskSchema = z.object({
  id: idSchema,
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;