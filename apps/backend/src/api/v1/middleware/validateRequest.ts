import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { MiddlewareFunction, RequestData } from "../../../types/express";

export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((x) => x.message).join(", ")}`
    );
  }
};

export const validateRequest = (
  schema: ObjectSchema<RequestData>
): MiddlewareFunction => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data: RequestData = {
      ...req.body,
      ...req.params,
      ...req.query
    };

    try {
      validate(schema, data);
      next();
    } catch (error) {
      next(error as Error);
    }
  };
};
