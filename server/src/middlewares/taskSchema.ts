import { z } from "zod";

const taskSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title field is required"), 
  description: z.string()
    .trim()
    .min(1, "Description field is required"), 
});

export default taskSchema;