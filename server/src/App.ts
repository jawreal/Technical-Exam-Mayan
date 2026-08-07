import express from "express";
import errorHandler from "@/middlewares/errorHandler";
import taskRouter from "@/routers";

const app = express();

app.use(express.json());
app.use("/api", taskRouter);
app.use(errorHandler);

export default app;