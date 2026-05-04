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
  login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any; accessToken?: string; refreshToken?: string }>;
  refresh(token: string): Promise<{ success: boolean; accessToken: string }>;
  getUserProfile(id: string): Promise<any>;
  updateProfile(id: string, data: any): Promise<any>;
  forgotPassword(email: string): Promise<{ success: boolean; message: string }>;
  verifyForgotPasswordOtp(email: string, otp: string): Promise<{ success: boolean; message: string; resetToken: string }>;
  resetPassword(email: string, newPassword: string, resetToken: string): Promise<{ success: boolean; message: string }>;
}
