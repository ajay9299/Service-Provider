import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validatorErrorMessage } from "../Utils/AuthHelper";

// <---------------------------------------User Initiate Reset password Validation Model------------------------------------------->
export const InitiateResetValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const isValid = Schema.validate(req.body);

    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
};

// <---------------------------------------User Complete Reset password Validation Model------------------------------------------->
export const completeResetValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)
        .required(),
    });

    const isValid = Schema.validate(req.body);

    if (isValid.error) {
      return validatorErrorMessage(isValid, res);
    }
    next();
  } catch (error) {
    next(error);
  }
};
