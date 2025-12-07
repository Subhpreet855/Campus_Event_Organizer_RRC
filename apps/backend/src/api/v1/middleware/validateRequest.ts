import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const data =
      req.method === "POST" || req.method === "PUT"
        ? req.body
        : req.params;

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    next();
  };
};
