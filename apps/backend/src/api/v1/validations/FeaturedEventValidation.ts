import type { Request, Response, NextFunction } from "express";

const requiredFields = ["name", "date", "time", "location", "description"] as const;

export function validateFeaturedEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (const field of requiredFields) {
    const value = (req.body as any)[field];

    if (typeof value !== "string" || value.trim() === "") {
      return res.status(400).json({
        error: `${field} is required and must be a non-empty string`,
      });
    }
  }

  next();
}
