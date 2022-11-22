import { Request, Response, NextFunction } from "express";
import UserModel, { IUser, IUserModel } from "../Models/User.model";
import { resetPasswordEmail } from "../Service/email.service";
import { generatePasswordReset } from "../Service/ResetPassword.service";
import { searchUserAndUpdate, findSpecificUser } from "../Service/User.service";
import { hashedPassword } from "../Utils/AuthHelper";

export const resetPasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetPasswordToken, resetPasswordExpires } = generatePasswordReset();
  const filter = { email: req.body.email.toLowerCase() };
  const update = { resetPasswordToken, resetPasswordExpires };
  findSpecificUser(filter, res).then((result: any) => {
    searchUserAndUpdate(filter, update, res);
    resetPasswordEmail(resetPasswordToken, req.body.email.toLowerCase());
  });
};

export const changePasswordController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter = {
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  };
  findSpecificUser(filter, res).then((result: any) => {
    hashedPassword(req.body.password).then((pass) => {
      result.password = pass;
      result.resetPasswordToken = null;
      result.resetPasswordExpires = null;
      const filter = { resetPasswordToken: req.params.token };
      const update = result;
      searchUserAndUpdate(filter, update, res);
    });
  });
};
