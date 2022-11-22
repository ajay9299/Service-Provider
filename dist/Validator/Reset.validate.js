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
exports.completeResetValidator = exports.InitiateResetValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthHelper_1 = require("../Utils/AuthHelper");
// <---------------------------------------User Initiate Reset password Validation Model------------------------------------------->
const InitiateResetValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
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
exports.InitiateResetValidator = InitiateResetValidator;
// <---------------------------------------User Complete Reset password Validation Model------------------------------------------->
const completeResetValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
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
exports.completeResetValidator = completeResetValidator;
