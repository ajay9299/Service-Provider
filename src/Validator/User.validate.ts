import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { responseMessages } from "../constant";
import { validatorErrorMessage, responseError } from "../Utils/AuthHelper";

// <---------------------------------------User SignUp Validation Model------------------------------------------->
export const signUpValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      fullName: Joi.string().required().min(4).max(20),
      gender: Joi.string().valid("male", "female", "other").required(),
      email: Joi.string().email().required(),
      role: Joi.number().valid(2, 3),
      acceptTerms: Joi.boolean().required().valid(true),
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

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)
        .required(),
    });
    const isLoginValid = loginSchema.validate(req.body);
    if (isLoginValid.error) return validatorErrorMessage(isLoginValid, res);
    next();
  } catch (err) {
    next(err);
  }
};

export const emailVerificationValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params != undefined && req.params != null) {
      next();
    } else {
      responseError(responseMessages.QUERY_VALIDATORS_MESSAGE, res);
    }
  } catch (err) {
    next(err);
  }
};
