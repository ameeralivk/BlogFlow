import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { IUserController } from "../interface/IUserController";
import { IUserAuthService } from "../../../service/userAuthService/interface/IUserAuthService";
import { Request, Response, NextFunction } from "express";
import HttpStatus from "../../../constants/httpStatus";
import { MESSAGES } from "../../../constants/messages";
import { AppError } from "../../../utils/Error";

@injectable()
export class UserAuthController implements IUserController {
  constructor(
    @inject(TYPES.userAuthService)
    private _userAuthService: IUserAuthService,
  ) {}

  signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fullName, email, password } = req.body;
      const otpsent = await this._userAuthService.register(
        fullName,
        email,
        password,
      );

      if (otpsent.success) {
        return res
          .status(201)
          .json({ success: true, message: MESSAGES.OTP_SENT_SUCCESS });
      }
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.OTP_SENT_FAILED });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, otp } = req.body;

      const { success, message } = await this._userAuthService.verifyOtp(
        email,
        otp,
      );

      if (success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message,
        });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message,
      });
    } catch (error) {
      next(error);
    }
  };

  resendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (!email || !emailRegex.test(email)) {
        throw new AppError(
          "Email Format are not Correct",
          HttpStatus.BAD_REQUEST,
        );
      }
      const { message, success } = await this._userAuthService.resendOtp(
        email,
        name,
        password,
      );
      if (success) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: message,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: message,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const { success, message, user, accessToken, refreshToken } =
        await this._userAuthService.login(email, password);

      if (success) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
        });

        return res.status(HttpStatus.OK).json({
          success: true,
          message,
          user,
        });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message,
      });
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  refresh = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Refresh token missing", HttpStatus.UNAUTHORIZED);
      }

      const { success, accessToken } =
        await this._userAuthService.refresh(refreshToken);

      if (success) {
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
        });

        return res.status(HttpStatus.OK).json({
          success: true,
          message: "Token refreshed",
        });
      }

      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Failed to refresh token",
      });
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const response = await this._userAuthService.getUserProfile(id as string);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const { fullName } = req.body;
      const profileImage = req.file ? req.file.path : undefined;

      const updateData: any = {};
      if (fullName) updateData.fullName = fullName;
      if (profileImage) updateData.profileImage = profileImage;

      const response = await this._userAuthService.updateProfile(
        id as string,
        updateData,
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { email } = req.body;
      const response = await this._userAuthService.forgotPassword(email);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  verifyForgotPasswordOtp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { email, otp } = req.body;
      const response = await this._userAuthService.verifyForgotPasswordOtp(
        email,
        otp,
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
      return res as any;
    }
  };

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { email, newPassword, resetToken } = req.body;
      const response = await this._userAuthService.resetPassword(
        email,
        newPassword,
        resetToken,
      );
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
      return res as any;
    }
  };
}
