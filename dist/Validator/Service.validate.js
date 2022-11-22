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
exports.serviceOrderValidator = exports.serviceValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthHelper_1 = require("../Utils/AuthHelper");
// <---------------------------------------Service Validation Model------------------------------------------->
const serviceValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
            title: joi_1.default.string().required(),
            desc: joi_1.default.string().required().min(20).max(150),
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
exports.serviceValidator = serviceValidator;
// <---------------------------------------Service Order Validation Model-------------------------------------------->
const serviceOrderValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Schema = joi_1.default.object({
            from: joi_1.default.string().hex().length(24).required(),
            to: joi_1.default.string().hex().length(24).required(),
            providerServiceId: joi_1.default.string().hex().length(24).required(),
            desc: joi_1.default.string().allow(null),
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
exports.serviceOrderValidator = serviceOrderValidator;
