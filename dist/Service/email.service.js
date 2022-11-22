"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordEmail = exports.isEmailServiceReady = void 0;
//Nodemailer
const nodemailer_1 = __importDefault(require("nodemailer"));
//GLOBAL VARIABLES
const constant_1 = require("../constant");
//handlesbars
const handlebars = __importStar(require("handlebars"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: constant_1.mail.AUTH_EMAIL,
        pass: constant_1.mail.AUTH_PASS,
    },
});
const isEmailServiceReady = (userEVId, userEmail) => {
    transporter.verify((error, success) => {
        if (error)
            return console.log(error);
    });
    let template = handlebars.compile(constant_1.emailTemplate.VERIFICATION_TEMPLATE);
    //userEVId
    let replacements = {
        userEVId: userEVId,
    };
    const htmlToSend = template(replacements);
    var details = {
        from: "Abhishek",
        to: userEmail,
        subject: "Email Verification",
        html: htmlToSend,
    };
    transporter.sendMail(details, (err) => {
        if (err)
            return console.log("ERROR :>", err);
        console.log("SENT EMAIL");
    });
};
exports.isEmailServiceReady = isEmailServiceReady;
const resetPasswordEmail = (passwordResetId, userEmail) => {
    transporter.verify((error, success) => {
        if (error)
            return console.log(error);
    });
    let template = handlebars.compile(constant_1.ResetPassword.RESET_PASSWORD);
    //userEVId
    let replacements = {
        resetId: passwordResetId,
    };
    const htmlToSend = template(replacements);
    var details = {
        from: "Abhishek",
        to: userEmail,
        subject: "Password Reset",
        html: htmlToSend,
    };
    transporter.sendMail(details, (err) => {
        if (err)
            return console.log("ERROR :>", err);
    });
};
exports.resetPasswordEmail = resetPasswordEmail;
