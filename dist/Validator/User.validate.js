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
exports.emailVerificationValidation = exports.loginValidator = exports.signUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constant_1 = require("../constant");
const AuthHelper_1 = require("../Utils/AuthHelper");
// <---------------------------------------User SignUp Validation Model------------------------------------------->
const signUpValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
            fullName: joi_1.default.string().required().min(4).max(20),
            gender: joi_1.default.string().valid("male", "female", "other").required(),
            email: joi_1.default.string().email().required(),
            role: joi_1.default.number().valid(2, 3),
            acceptTerms: joi_1.default.boolean().required().valid(true),
            password: joi_1.default.string()
                .min(6)
                .max(20)
                .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)
                .required(),
        });
        const isValid = Schema.validate(req.body);
        if (isValid.error) {
            return (0, AuthHelper_1.validatorErrorMessage)(isValid, res);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.signUpValidator = signUpValidator;
const loginValidator = (req, res, next) => {
    try {
        const loginSchema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string()
                .min(6)
                .max(20)
                .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)
                .required(),
        });
        const isLoginValid = loginSchema.validate(req.body);
        if (isLoginValid.error)
            return (0, AuthHelper_1.validatorErrorMessage)(isLoginValid, res);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.loginValidator = loginValidator;
const emailVerificationValidation = (req, res, next) => {
    try {
        if (req.params != undefined && req.params != null) {
            next();
        }
        else {
            (0, AuthHelper_1.responseError)(constant_1.responseMessages.QUERY_VALIDATORS_MESSAGE, res);
        }
    }
    catch (err) {
        next(err);
    }
};
exports.emailVerificationValidation = emailVerificationValidation;
