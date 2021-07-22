import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import { DatabaseError } from "pg";

import logger from "./logger";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) return joiError(err, res);
  if (err instanceof DatabaseError) return pgError(err, res);

  logger.error(err);
  return res.sendStatus(500);

}

function joiError(err: ValidationError, res: Response) {
  logger.info(err);
  switch (err.details[0].type) {
    case "string.empty":
    case "string.min":
    case "string.max":
    case "string.length":
    case "string.base":
    case "string.email":
    case "number.min":
    case "number.base":
    case "any.required":
      res.status(400).send(err.details.map((details) => details.message));
      break;
    default:
      res.status(500).send(err.details.map((details) => details.message));
      break;
  }
}

function pgError(err: DatabaseError, res: Response) {
  logger.error(err);
  res.sendStatus(500);
}
