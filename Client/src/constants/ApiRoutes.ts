export const API_ROUTES = {
  AUTH: {
    REGISTER: "/user/auth/signup",
    VERIFY_OTP: "/user/auth/verify-otp",
    RESEND_OTP: "/user/auth/resent-otp",
    LOGIN: "/user/auth/login",
    REFRESH_TOKEN: "/user/auth/refresh-token",
    LOGOUT: "/user/auth/logout",
    PROFILE: (id: string) => `/user/auth/profile/${id}`,
    FORGOT_PASSWORD: "/user/auth/forgot-password",
    VERIFY_FORGOT_PASSWORD_OTP: "/user/auth/verify-forgot-password-otp",
    RESET_PASSWORD: "/user/auth/reset-password",
  },
  POSTS: {
    BASE: "/posts",
    BY_AUTHOR: (authorId: string) => `/posts/author/${authorId}`,
    BY_ID: (id: string) => `/posts/${id}`,
  },
};
