import type { Request, Response, NextFunction } from "express";
import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type UpdateStatusInput } from "@/middlewares/taskSchema";

const updateStatus = async (
  req: Request<{}, {}, UpdateStatusInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, id } = req.body;
    const [updatedStatus] = await db
      .update(taskTable)
      .set({ status })
      .where(eq(taskTable.id, id))
      .returning(); // Get the updated version
      
    if (!updatedStatus) {
      // Check if found otherwise throw error
      console.log("Task not found")
      return res.status(404).json({ message: "Task not found" });
    }
    
    console.log("Status been updated");
    res.status(200).json({
      message: "Status has been updated",
    });
  } catch (error) {
    console.log("Error in update task")
    // Pass the error to the error handler
    next(error);
  }
};

export default updateStatus;
