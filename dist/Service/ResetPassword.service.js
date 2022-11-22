"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordReset = void 0;
const crypto = require("crypto");
const generatePasswordReset = () => {
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    return { resetPasswordToken, resetPasswordExpires };
};
exports.generatePasswordReset = generatePasswordReset;
