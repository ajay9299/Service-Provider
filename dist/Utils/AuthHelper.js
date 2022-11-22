"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.responseError = exports.validatorErrorMessage = exports.comparePassword = exports.hashedPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../constant");
const config_1 = __importDefault(require("config"));
// <---------------------------------------------Password EnCoder----------------------------------------->
const hashedPassword = (planPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield (0, bcrypt_1.genSalt)(10);
        return yield (0, bcrypt_1.hash)(planPassword, salt);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.hashedPassword = hashedPassword;
// <----------------------------------------------Password DeCoder---------------------------------------->
const comparePassword = (planPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, bcrypt_1.compare)(planPassword, hashedPassword);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.comparePassword = comparePassword;
// <-----------------------------------------------Validator Error Message------------------------------>
const validatorErrorMessage = (isValid, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({
        success: false,
        error: isValid.error.details[0].message,
    });
});
exports.validatorErrorMessage = validatorErrorMessage;
// <-----------------------------------------------Response Error Message------------------------------>
const responseError = (message, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({
        success: false,
        error: message,
    });
});
exports.responseError = responseError;
// <------------------------------------JWT Verification------------------------------------------------>
const authenticateToken = (req, res, next) => {
    if (req.originalUrl === "/api/v1/roles") {
        console.log(">>>>");
        next();
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(constant_1.statusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Please pass valid token",
        });
    jsonwebtoken_1.default.verify(token, config_1.default.get("SECRET_KEY"), (err, user) => {
        if (err) {
            return res.status(constant_1.statusCodes.UNAUTHORIZED).json({
                success: false,
                message: constant_1.responseMessages.INVALID_TOKEN,
            });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
