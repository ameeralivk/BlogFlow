// Common reusable regex patterns

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
  // Minimum 6 chars, at least 1 letter & 1 number

  NAME: /^[A-Za-z\s]{3,}$/,
  // Only letters + spaces, min 3 chars

  PHONE: /^[6-9]\d{9}$/,
  // Indian phone number (optional for your use case)
};