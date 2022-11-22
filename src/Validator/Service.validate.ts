import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validatorErrorMessage } from "../Utils/AuthHelper";

// <---------------------------------------Service Validation Model------------------------------------------->
export const serviceValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      title: Joi.string().required(),
      desc: Joi.string().required().min(20).max(150),
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

// <---------------------------------------Service Order Validation Model-------------------------------------------->
export const serviceOrderValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Schema = Joi.object({
      from: Joi.string().hex().length(24).required(),
      to: Joi.string().hex().length(24).required(),
      providerServiceId: Joi.string().hex().length(24).required(),
      desc: Joi.string().allow(null),
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
