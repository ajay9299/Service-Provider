import { Request, Response, NextFunction } from "express";
import { responseMessages, statusCodes } from "../constant";
import UserModel, { IUserModel } from "../Models/User.model";
import { comparePassword, responseError } from "../Utils/AuthHelper";
import {
  signUpService,
  searchUserForLogin,
  userSearchByEmail,
  searchUserAndUpdate,
} from "../Service/User.service";
import config from "config";
import jwt from "jsonwebtoken";
import { UuidModel } from "../Models";

const SECRET_KEY: string = config.get("SECRET_KEY");

// <----------------------------------------SignUp Controller--------------------------------------->
export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const isUserAlready: boolean = await userSearchByEmail(
      req.body.email.toLowerCase()
    );

    if (isUserAlready) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: responseMessages.USER_ALREADY_PRESENT,
      });
    }

    // convert email to lower case
    req.body.email = req.body.email.toLowerCase();

    const { fullName, gender, _id, email, role } = (await signUpService(
      req.body
    )) as IUserModel;
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      message: responseMessages.USER_CREATED,
      newlyCreatedUser: { _id, fullName, gender, role, email },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  searchUserForLogin(req.body.email.toLowerCase())
    .then((result) => {
      comparePassword(req.body.password, result.password).then((pass) => {
        if (pass) {
          if (result.isEmailVerified) {
            const payload = {
              email: result.email,
              role: result.role,
              isProfileCompleted: result.isProfileCompleted,
              _id: result._id,
            };
            const token = jwt.sign(payload, SECRET_KEY);
            res.send({
              success: true,
              auth: token,
              expiresIn: "15min",
              expiresInMS: "900000",
            });
          } else {
            responseError(responseMessages.NOT_VERIFIED_USER, res);
          }
        } else {
          responseError(responseMessages.WRONG_PASSWORD, res);
        }
      });
    })
    .catch((userError) => {
      responseError(responseMessages.NOT_FOUND, res);
    });
};

export const emailVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  UuidModel.findOne({ Uuid: req.params.Uuid }, "userId")
    .then((userIdRes) => {
      if (!userIdRes) {
        return responseError(responseMessages.INVALID_USER, res);
      } else {
        const filter = { _id: userIdRes?.userId };
        const update = { isEmailVerified: true };
        searchUserAndUpdate(filter, update, res);
      }
    })
    .catch((error) => {
      responseError(responseMessages.INVALID_USER, res);
    });
};
