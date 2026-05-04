import type { LoginData, ValidationError } from "../types/IUser";
import { REGEX } from "../utils/regex";
export const validateLoginPage = (data: LoginData): ValidationError[] => {
  // Full Name
  const errors: ValidationError[] = [];

  // Email
  if (!data.email || !REGEX.EMAIL.test(data.email)) {
    errors.push({
      field: "email",
      message: "Invalid email address",
    });
  }

  // Password
  if (!data.password || !REGEX.PASSWORD.test(data.password)) {
    errors.push({
      field: "password",
      message:
        "Password must be at least 6 characters and contain letters and numbers",
    });
  }

  return errors;
};
