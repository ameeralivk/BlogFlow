import { AppError } from "./Error";
import HttpStatus from "../constants/httpStatus";

export function assertFound<T>(
  entity: T | null | undefined,
  message: string,
  statusCode: number = HttpStatus.NOT_FOUND,
): T {
  if (!entity) {
    throw new AppError(message, statusCode);
  }
  return entity;
}
