"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.resetPasswordController = void 0;
const email_service_1 = require("../Service/email.service");
const ResetPassword_service_1 = require("../Service/ResetPassword.service");
const User_service_1 = require("../Service/User.service");
const AuthHelper_1 = require("../Utils/AuthHelper");
const resetPasswordController = (req, res, next) => {
    const { resetPasswordToken, resetPasswordExpires } = (0, ResetPassword_service_1.generatePasswordReset)();
    const filter = { email: req.body.email.toLowerCase() };
    const update = { resetPasswordToken, resetPasswordExpires };
    (0, User_service_1.findSpecificUser)(filter, res).then((result) => {
        (0, User_service_1.searchUserAndUpdate)(filter, update, res);
        (0, email_service_1.resetPasswordEmail)(resetPasswordToken, req.body.email.toLowerCase());
    });
};
exports.resetPasswordController = resetPasswordController;
const changePasswordController = (req, res, next) => {
    const filter = {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    };
    (0, User_service_1.findSpecificUser)(filter, res).then((result) => {
        (0, AuthHelper_1.hashedPassword)(req.body.password).then((pass) => {
            result.password = pass;
            result.resetPasswordToken = null;
            result.resetPasswordExpires = null;
            const filter = { resetPasswordToken: req.params.token };
            const update = result;
            (0, User_service_1.searchUserAndUpdate)(filter, update, res);
        });
    });
};
exports.changePasswordController = changePasswordController;
