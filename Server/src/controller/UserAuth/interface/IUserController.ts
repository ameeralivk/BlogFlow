import { Request, Response, NextFunction } from "express";

export interface IUserController {
  signup(req: Request, res: Response): Promise<Response>;
  verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  resendOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
  login(req: Request, res: Response, next: NextFunction): Promise<Response>;
  refresh(req: Request, res: Response, next: NextFunction): Promise<Response>;
  logout(req: Request, res: Response, next: NextFunction): Promise<Response>;
  forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response>;
  verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<Response>;
  resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
