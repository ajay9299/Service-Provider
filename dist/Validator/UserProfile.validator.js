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
exports.basicProfileUpdateValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthHelper_1 = require("../Utils/AuthHelper");
// <---------------------------------------User Basic Profile Validation Model------------------------------------------->
const basicProfileUpdateValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
            fullName: joi_1.default.string().required().min(4).max(15).optional(),
            gender: joi_1.default.string()
                .valid("male", "female", "other")
                .required()
                .optional(),
            phoneNumber: joi_1.default.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required()
                .optional(),
            address: joi_1.default.object({
                state: joi_1.default.string().required(),
                city: joi_1.default.string().required(),
                houseNumber: joi_1.default.string().required(),
                pinCode: joi_1.default.string().required(),
            }).optional(),
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
exports.basicProfileUpdateValidator = basicProfileUpdateValidator;
