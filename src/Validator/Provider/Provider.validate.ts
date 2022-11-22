import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { join } from "path";
import { validatorErrorMessage } from "../../Utils/AuthHelper";

export const createProviderValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providerSchema = Joi.object({
      userId: Joi.string().hex().length(24).required(),
      categoryId: Joi.string().hex().length(24).required(),
      vendorName: Joi.string().min(5).max(20).required(),
      experience: Joi.number().max(25).required(),
      details: Joi.string().required(),
      cost: Joi.number().required().greater(100),
    });
    const isValid = providerSchema.validate(req.body);
    if (isValid.error) return validatorErrorMessage(isValid, res);
    next();
  } catch (error) {
    next(error);
  }
};
