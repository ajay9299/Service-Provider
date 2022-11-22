import { NextFunction, Request, Response } from "express";
import { responseMessages, statusCodes } from "../constant";

// <--------------------------------------Role Base Access Control----------------------------------------->
export const roleCheckerMiddleware = (roles: Number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(statusCodes.FORBIDDEN).json({
        success: false,
        message: responseMessages.USER_NOT_ALLOWED,
      });
    }
  };
};
