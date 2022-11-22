"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ResetPassword_controller_1 = require("../Controller/ResetPassword.controller");
const User_controller_1 = require("../Controller/User.controller");
const Reset_validate_1 = require("../Validator/Reset.validate");
const User_validate_1 = require("../Validator/User.validate");
const router = (0, express_1.Router)();
// <-------------------------------------------SignUp Route------------------------------------------->
router.post("/signup", User_validate_1.signUpValidator, User_controller_1.signUpController);
// <-------------------------------------------Login Route------------------------------------------->
router.post("/login", User_validate_1.loginValidator, User_controller_1.loginController);
// <-------------------------------------------Email Verification Route------------------------------------------->
router.get("/verificationById/:Uuid", User_validate_1.emailVerificationValidation, User_controller_1.emailVerification);
// <-------------------------------------------Initiate Reset Password Route------------------------------------------->
router.post("/resetPassword", Reset_validate_1.InitiateResetValidator, ResetPassword_controller_1.resetPasswordController);
// <-------------------------------------------Complete Reset Password Route------------------------------------------->
router.post("/resetPasswordConfirmation/:token", Reset_validate_1.completeResetValidator, ResetPassword_controller_1.changePasswordController);
exports.default = router;
