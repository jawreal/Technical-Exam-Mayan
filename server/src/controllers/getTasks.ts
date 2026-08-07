import type { Request, Response, NextFunction } from "express";
import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { type GetTasksQuery } from "@/middlewares/querySchema";
import { or, eq, and, ilike } from "drizzle-orm";

const getTasks = async (
  req: Request<{}, {}, {}, GetTasksQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query, filter } = req.query;
    const status = filter === "all" ? undefined : filter; // "all" | "incomplete" | "complete"
    const conditions = [];
    
    // Add the query when it exist
    if (query) {
      conditions.push(
        or(
          ilike(taskTable.title, `%${query}%`),
          ilike(taskTable.description, `%${query}%`),
        ),
      );
    }
    
    // Add filter if it exist
    if (status) {
      conditions.push(eq(taskTable.status, status));
    }

    const tasks = await db
      .select()
      .from(taskTable)
      .where(conditions?.length > 0 ? and(...conditions) : undefined);


    res.status(200).json({
      tasks, 
    });
  } catch (error) {
    // Pass the error to the error handler
    next(error);
  }
};

export default getTasks;
