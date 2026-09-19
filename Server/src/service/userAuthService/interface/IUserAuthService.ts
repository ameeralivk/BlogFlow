import { UpdateProfileRequestDTO, UserResponseDTO } from "../../../utils/dto/dto/user.dto";

export interface IUserAuthService {
  register(fullName: string, email: string, password: string): Promise<{success:boolean,message:string}>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{
    success: boolean;
    message: string;
  }>;
   resendOtp(email: string,name:string,password:string): Promise<{ success: boolean; message: string }>;
  login(email: string, password: string): Promise<{ success: boolean; message: string; user?: UserResponseDTO; accessToken?: string; refreshToken?: string }>;
  refresh(token: string): Promise<{ success: boolean; accessToken: string }>;
  getUserProfile(id: string): Promise<{ success: boolean; user: UserResponseDTO }>;
  updateProfile(id: string, data: UpdateProfileRequestDTO): Promise<{ success: boolean; user: UserResponseDTO }>;
  forgotPassword(email: string): Promise<{ success: boolean; message: string }>;
  verifyForgotPasswordOtp(email: string, otp: string): Promise<{ success: boolean; message: string; resetToken: string }>;
  resetPassword(email: string, newPassword: string, resetToken: string): Promise<{ success: boolean; message: string }>;
}
