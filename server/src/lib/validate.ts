import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

type Target = "body" | "query" | "params";

type ValidateOptions = {
  schema: z.ZodSchema;
  target?: Target; // Optional, defaults to "body"
};

export const validate = ({ schema, target = "body" }: ValidateOptions) =>
  (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = req[target] // Pick body, query, or params

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      console.log("Invalid fields")
      return res.status(400).json({
        message: "Invalid fields",
        errors: result.error.flatten().fieldErrors // Send actual zod errors
      });
    }

    req[target] = result.data; // Overwrite with sanitized + typed data
    next();
}