import type { Request, Response, NextFunction } from "express";
import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { type CreateTaskInput } from "@/middlewares/taskSchema";

const addTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = req.body;
    await db.insert(taskTable).values(task);
    
    console.log("Task has been added");
    res.status(200).json({
      message: "Task has been added",
    });
  } catch (error) {
    // Pass the error to the error handler
    next(error);
  }
};

export default addTask;