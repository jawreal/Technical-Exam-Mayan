import { Router } from "express";
import addTask from "@/controllers/addTask";
import updateTask from "@/controllers/addTask";
import getTasks from "@/controllers/getTasks";
import {
  createTaskSchema,
  updateTaskSchema
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

export default router;
