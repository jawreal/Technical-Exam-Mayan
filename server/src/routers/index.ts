import { Router } from "express";
import addTask from "@/controllers/addTask";
import taskSchema from "@/middlewares/taskSchema";
import { validate } from "@/lib/validate";
const router = Router();

router.post("/add-task", validate({ schema: taskSchema }), addTask);

export default router;