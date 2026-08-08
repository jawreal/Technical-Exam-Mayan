import { Request } from "express";
import { type GetTasksQuery } from "@/middlewares/querySchema";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: GetTasksQuery;
    }
  }
}