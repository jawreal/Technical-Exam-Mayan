import type { Request, Response, NextFunction } from "express";
import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { type DeleteTaskInput } from "@/middlewares/taskSchema";
import { eq } from "drizzle-orm";

const deleteTask = async (
  req: Request<{}, {}, DeleteTaskInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;
    const [deletedTask] = await db
     .delete(taskTable)
     .where(eq(taskTable.id, id))
     .returning(); // Return the deleted row

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" }); // Handle not found
    }

    console.log("Task has been deleted");
    res.status(200).json({
      message: "Task has been deleted", 
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTask;