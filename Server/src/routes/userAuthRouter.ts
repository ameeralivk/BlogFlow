import express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import container from "../DI/container";
import { UserAuthController } from "../controller/UserAuth/implementation/userController";
import { TYPES } from "../DI/types";
import { upload } from "../config/cloudinary";
import { protect } from "../middleware/authMiddleware";
const Router = express.Router();
const userAuthController = container.get<UserAuthController>(
  TYPES.userAuthController,
);

Router.route("/signup").post(asyncHandler(userAuthController.signup));
Router.route("/verify-otp").post(asyncHandler(userAuthController.verifyOtp));
Router.route("/resent-otp").post(asyncHandler(userAuthController.resendOtp));
Router.route("/login").post(asyncHandler(userAuthController.login));
Router.route("/refresh-token").post(asyncHandler(userAuthController.refresh));
Router.route("/logout").post(asyncHandler(userAuthController.logout));
Router.route("/profile/:id")
  .get(protect, asyncHandler(userAuthController.getProfile))
  .put(
    upload.single("profileImage"),
    protect,
    asyncHandler(userAuthController.updateProfile),
  );

Router.route("/forgot-password").post(
  asyncHandler(userAuthController.forgotPassword),
);
Router.route("/verify-forgot-password-otp").post(
  asyncHandler(userAuthController.verifyForgotPasswordOtp),
);
Router.route("/reset-password").post(
  asyncHandler(userAuthController.resetPassword),
);

export default Router;
