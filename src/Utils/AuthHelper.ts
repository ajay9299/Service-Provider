import { hash, genSalt, compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { responseMessages, statusCodes } from "../constant";
import config from "config";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

// <---------------------------------------------Password EnCoder----------------------------------------->
export const hashedPassword = async (planPassword: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    return await hash(planPassword, salt);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <----------------------------------------------Password DeCoder---------------------------------------->
export const comparePassword = async (
  planPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await compare(planPassword, hashedPassword);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <-----------------------------------------------Validator Error Message------------------------------>
export const validatorErrorMessage = async (
  isValid: any,
  res: Response
): Promise<Response> => {
  return res.status(404).json({
    success: false,
    error: isValid.error.details[0].message,
  });
};

// <-----------------------------------------------Response Error Message------------------------------>
export const responseError = async (
  message: string,
  res: Response
): Promise<Response> => {
  return res.status(404).json({
    success: false,
    error: message,
  });
};

// <------------------------------------JWT Verification------------------------------------------------>
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(req.originalUrl === "/api/v1/roles"){
    console.log(">>>>")
    next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)  
    return res.status(statusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Please pass valid token",
    });
  jwt.verify(token, config.get("SECRET_KEY"), (err: any, user: any) => {
    if (err) {
      return res.status(statusCodes.UNAUTHORIZED).json({
        success: false,
        message: responseMessages.INVALID_TOKEN,
      });
    }
    req.user = user;
    next();
  });
};
