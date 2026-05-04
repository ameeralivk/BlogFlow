import type { IUser } from "../types/IUser";
import { apiRequest } from "../api/apiRequest";
import{ HTTP_METHOD } from "../constants/httpMethod";
import { API_ROUTES } from "../constants/ApiRoutes";
export const Register = async (
  formData: IUser,
): Promise<{success:true,message:string}> => {
    console.log(formData,'data is here')
  return apiRequest(
    HTTP_METHOD.POST,
    API_ROUTES.AUTH.REGISTER,
    formData
  );
};

export const VerifyOtp = async (
  email: string,
  otp: string
): Promise<{success:boolean,message:string}> => {
  return apiRequest(
    HTTP_METHOD.POST,
    API_ROUTES.AUTH.VERIFY_OTP,
    { email, otp }
  );
};
export const ResendOtp = async (
  email: string,
  name:string,
  password:string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.RESEND_OTP, { email,name,password });
};

export const Login = async (
  data: any
): Promise<{ success: boolean; message: string; user: any; accessToken: string; refreshToken: string }> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.LOGIN, data);
};

export const ForgotPassword = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
};

export const VerifyForgotPasswordOtp = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string; resetToken: string }> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.VERIFY_FORGOT_PASSWORD_OTP, { email, otp });
};

export const ResetPassword = async (
  data: any
): Promise<{ success: boolean; message: string }> => {
  return apiRequest(HTTP_METHOD.POST, API_ROUTES.AUTH.RESET_PASSWORD, data);
};
