import { Router } from "express";
import addTask from "@/controllers/addTask";
import updateTask from "@/controllers/updateTask";
import getTasks from "@/controllers/getTasks";
import deleteTask from "@/controllers/deleteTask";
import {
  createTaskSchema,
  updateTaskSchema,  
  deleteTaskSchema
} from "@/middlewares/taskSchema";
import { getTasksQuerySchema } from "@/middlewares/querySchema";
import { validate } from "@/lib/validate";
const router = Router();

router.get(
  "/get-tasks",
  validate({ schema: getTasksQuerySchema, target: "query" }),
  getTasks,
);
router.post("/add-task", validate({ schema: createTaskSchema }), addTask);
router.patch(
  "/update-task",
  validate({ schema: updateTaskSchema }),
  updateTask,
);
router.delete(
  "/delete-task",
  validate({ schema: deleteTaskSchema }),
  deleteTask,
);

export default router;
