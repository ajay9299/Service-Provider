import { Router } from "express";
import {
  resetPasswordController,
  changePasswordController,
} from "../Controller/ResetPassword.controller";
import {
  signUpController,
  loginController,
  emailVerification,
} from "../Controller/User.controller";
import {
  completeResetValidator,
  InitiateResetValidator,
} from "../Validator/Reset.validate";
import {
  signUpValidator,
  loginValidator,
  emailVerificationValidation,
} from "../Validator/User.validate";

const router = Router();

// <-------------------------------------------SignUp Route------------------------------------------->
router.post("/signup", signUpValidator, signUpController);

// <-------------------------------------------Login Route------------------------------------------->
router.post("/login", loginValidator, loginController);

// <-------------------------------------------Email Verification Route------------------------------------------->
router.get(
  "/verificationById/:Uuid",
  emailVerificationValidation,
  emailVerification
);

// <-------------------------------------------Initiate Reset Password Route------------------------------------------->
router.post(
  "/resetPassword",
  InitiateResetValidator,
  resetPasswordController
);

// <-------------------------------------------Complete Reset Password Route------------------------------------------->
router.post(
  "/resetPasswordConfirmation/:token",
  completeResetValidator,
  changePasswordController
);

export default router;
