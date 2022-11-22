"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviderValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthHelper_1 = require("../../Utils/AuthHelper");
const createProviderValidator = (req, res, next) => {
    try {
        const providerSchema = joi_1.default.object({
            userId: joi_1.default.string().hex().length(24).required(),
            categoryId: joi_1.default.string().hex().length(24).required(),
            vendorName: joi_1.default.string().min(5).max(20).required(),
            experience: joi_1.default.number().max(25).required(),
            details: joi_1.default.string().required(),
            cost: joi_1.default.number().required().greater(100),
        });
        const isValid = providerSchema.validate(req.body);
        if (isValid.error)
            return (0, AuthHelper_1.validatorErrorMessage)(isValid, res);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createProviderValidator = createProviderValidator;
