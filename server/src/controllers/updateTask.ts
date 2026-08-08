import type { Request, Response, NextFunction } from "express";
import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type UpdateTaskInput } from "@/middlewares/taskSchema";

const updateTask = async (
  req: Request<{}, {}, UpdateTaskInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, title, description } = req.body;
    const [updatedTask] = await db
      .update(taskTable)
      .set({ title, description })
      .where(eq(taskTable.id, id))
      .returning(); // Get the updated version
      
    if (!updatedTask) {
      // Check if found otherwise throw error
      console.log("Task not found")
      return res.status(404).json({ message: "Task not found" });
    }
    
    console.log("Task has been updated");
    res.status(200).json({
      message: "Task has been updated",
    });
  } catch (error) {
    console.log("Error in update task")
    // Pass the error to the error handler
    next(error);
  }
};

export default updateTask;
