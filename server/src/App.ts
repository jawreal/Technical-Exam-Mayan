import type { Request, Response } from "express";
import express from "express";
import errorHandler from "@/middlewares/errorHandler";
import taskRouter from "@/routers";
import path from "path";
import { fileURLToPath } from "url";

// ESM doesn't have __dirname, so these are needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the production build from the client
const distPath = path.join(__dirname, "../../client/dist");

const app = express();

// Middleware: parse JSON requests
app.use(express.json());

// API routes
app.use("/api", taskRouter);

// Serve static files from the client build
app.use(express.static(distPath));

// SPA fallback: send index.html for any non-API route
app.get("/*splat", (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Global error handler - must be last
app.use(errorHandler);

export default app;