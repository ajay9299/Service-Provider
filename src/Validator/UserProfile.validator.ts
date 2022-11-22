import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validatorErrorMessage } from "../Utils/AuthHelper";

// <---------------------------------------User Basic Profile Validation Model------------------------------------------->
export const basicProfileUpdateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      fullName: Joi.string().required().min(4).max(15).optional(),
      gender: Joi.string()
        .valid("male", "female", "other")
        .required()
        .optional(),
      phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .optional(),
      address: Joi.object({
        state: Joi.string().required(),
        city: Joi.string().required(),
        houseNumber: Joi.string().required(),
        pinCode: Joi.string().required(),
      }).optional(),
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
