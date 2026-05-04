import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import HttpStatus from "../constants/httpStatus";
import { AppError } from "../utils/Error";

export interface CustomRequest extends Request {
  user?: any;
}

export const protect = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  let token;

  // ✅ 1. Check cookies FIRST
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  // ✅ 2. Fallback to Authorization header (optional)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("Not authorized, no token provided", HttpStatus.UNAUTHORIZED)
    );
  }

  try {
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return next(
        new AppError("Not authorized, token failed", HttpStatus.UNAUTHORIZED)
      );
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(
      new AppError("Not authorized, token failed", HttpStatus.UNAUTHORIZED)
    );
  }
};