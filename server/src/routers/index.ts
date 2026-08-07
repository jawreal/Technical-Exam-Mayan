import { Router } from "express";
import addTask from "@/controllers/addTask";
import updateTask from "@/controllers/addTask";
import { createTaskSchema, updateTaskSchema } from "@/middlewares/taskSchema";
import { validate } from "@/lib/validate";
const router = Router();

router.post("/add-task", validate({ schema: createTaskSchema }), addTask);
router.patch("/update-task", validate({ schema: updateTaskSchema }), updateTask);

export default router;