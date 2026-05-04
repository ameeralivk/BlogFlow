import { inject, injectable } from "inversify";
import { IUserAuthService } from "../interface/IUserAuthService";
import { TYPES } from "../../../DI/types";
import { IUserAuthRepository } from "../../../Repositories/userAuthRepository/interface/IUserAuthRepository";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../../../utils/sentOtp";
import redisClient from "../../../config/redisClient";
import crypto from "crypto";
import { generateOtp } from "../../../helpers/generateOtp";
import { AppError } from "../../../utils/Error";
import HttpStatus from "../../../constants/httpStatus";
import { MESSAGES } from "../../../constants/messages";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../utils/jwt";

@injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    @inject(TYPES.userAuthRepo)
    private _userAuthRepo: IUserAuthRepository,
  ) {}

  async register(
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._userAuthRepo.findByEmail(email);
    if (existing) throw new Error(MESSAGES.USER_ALREADY_EXIST);

    const hashedPassword = await bcrypt.hash(password, 10);

    const { hashedOtp, otp } = generateOtp();
    const data = {
      fullName,
      email,
      password: hashedPassword,
    };
    const redisDataKey = `UserData:${email}`;
    const redisOtpKey = `otp:${email}`;
    await redisClient.setEx(redisDataKey, 600, JSON.stringify(data));
    await redisClient.setEx(redisOtpKey, 120, hashedOtp);
    const res = await sendOtpEmail(email, otp);
    if (res.success) {
      return {
        success: true,
        message: MESSAGES.OTP_SENT_SUCCESS,
      };
    } else {
      return {
        success: true,
        message: MESSAGES.OTP_SENT_FAILED,
      };
    }
  }

  async verifyOtp(email: string, otp: string) {
    const redisDataKey = `UserData:${email}`;
    const redisOtpKey = `otp:${email}`;
    const hashedOtp = await redisClient.get(redisOtpKey);

    if (!hashedOtp) {
      throw new AppError(MESSAGES.OTP_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    if (hashedInputOtp !== hashedOtp) {
      throw new AppError("Invalid OTP", HttpStatus.BAD_REQUEST);
    }
    const userDataString = await redisClient.get(redisDataKey);
    if (!userDataString) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const userData = JSON.parse(userDataString);

    await this._userAuthRepo.createUser(userData);

    await redisClient.del(redisOtpKey);
    await redisClient.del(redisDataKey);
    return {
      success: true,
      message: MESSAGES.OTP_VERIFY_SUCCESS,
    };
  }

  resendOtp = async (email: string,name:string,password:string) => {
    const { otp, hashedOtp } = generateOtp();
    const redisOtpKey = `otp:${email}`;
    const redisDataKey = `UserData:${email}`;
    const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
      fullName:name,
      email,
      password: hashedPassword,
    };
    await redisClient.setEx(redisDataKey, 600, JSON.stringify(data));
    await redisClient.setEx(redisOtpKey, 120, hashedOtp);
    await sendOtpEmail(email, otp);

    return { success: true, message: MESSAGES.OTP_RESENT_SUCCESS };
  };

  async login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    user?: any;
    accessToken?: string;
    refreshToken?: string;
  }> {
    const user = await this._userAuthRepo.findByEmail(email);
    if (!user) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials", HttpStatus.BAD_REQUEST);
    }

    const payload = { id: user._id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string): Promise<{ success: boolean; accessToken: string }> {
    const payload = verifyRefreshToken(token);
    if (!payload) {
      throw new AppError("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }

    const newAccessToken = generateAccessToken({ id: payload.id, email: payload.email });
    return {
      success: true,
      accessToken: newAccessToken,
    };
  }

  async getUserProfile(id: string): Promise<any> {
    const user = await this._userAuthRepo.findById(id);
    if (!user) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    };
  }

  async updateProfile(id: string, data: any): Promise<any> {
    const updatedUser = await this._userAuthRepo.updateUser(id, data);
    if (!updatedUser) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return {
      success: true,
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      },
    };
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await this._userAuthRepo.findByEmail(email);
    if (!user) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { otp, hashedOtp } = generateOtp();
    const redisOtpKey = `forgot_otp:${email}`;
    await redisClient.setEx(redisOtpKey, 300, hashedOtp); // 5 mins
    const res = await sendOtpEmail(email, otp);
    
    if (res.success) {
      return { success: true, message: MESSAGES.OTP_SENT_SUCCESS };
    } else {
      throw new AppError(MESSAGES.OTP_SENT_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyForgotPasswordOtp(email: string, otp: string): Promise<{ success: boolean; message: string; resetToken: string }> {
    const redisOtpKey = `forgot_otp:${email}`;
    const hashedOtp = await redisClient.get(redisOtpKey);

    if (!hashedOtp) {
      throw new AppError(MESSAGES.OTP_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
      
    if (hashedInputOtp !== hashedOtp) {
      throw new AppError("Invalid OTP", HttpStatus.BAD_REQUEST);
    }

    await redisClient.del(redisOtpKey);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const redisResetKey = `reset_token:${email}`;
    await redisClient.setEx(redisResetKey, 600, resetToken); // 10 mins

    return {
      success: true,
      message: MESSAGES.OTP_VERIFY_SUCCESS,
      resetToken,
    };
  }

  async resetPassword(email: string, newPassword: string, resetToken: string): Promise<{ success: boolean; message: string }> {
    const redisResetKey = `reset_token:${email}`;
    const storedToken = await redisClient.get(redisResetKey);

    if (!storedToken || storedToken !== resetToken) {
      throw new AppError("Invalid or expired reset token", HttpStatus.BAD_REQUEST);
    }

    const user = await this._userAuthRepo.findByEmail(email);
    if (!user) {
      throw new AppError(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this._userAuthRepo.updateUser(user._id.toString(), { password: hashedPassword });

    await redisClient.del(redisResetKey);

    return {
      success: true,
      message: "Password reset successfully",
    };
  }
}
