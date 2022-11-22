import UserModel, { IUser, IUserModel } from "../Models/User.model";
import { hashedPassword } from "../Utils/AuthHelper";
import { Response } from "express";
import { responseMessages, statusCodes } from "../constant";

//Mailer
// import { isEmailServiceReady } from "../Service/email.service";
//UUID
import { v4 as uuid } from "uuid";
import { UuidModel } from "../Models";
import { isEmailServiceReady } from "./email.service";
// <--------------------------------------------SignUp Service------------------------------------------->
export const signUpService = async (
  userInfo: IUser
): Promise<IUserModel | undefined | any> => {
  try {
    userInfo.password = await hashedPassword(userInfo.password);
    const newlyCreatedUser = await UserModel.create(userInfo);
    const userEVId: string = uuid();
    await UuidModel.create({ Uuid: userEVId, userId: newlyCreatedUser._id });
    isEmailServiceReady(userEVId, userInfo.email);
    return newlyCreatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

// <---------------------------------------------User Search By Email & PhoneNumber Service-------------->
export const userSearchByEmail = async (email: string): Promise<boolean> => {
  try {
    return (await UserModel.findOne({ email })) ? true : false;
  } catch (error: any) {
    throw new Error(error);
  }
};

// <**********************************User Search By Email Service for Login ***********************************>
export const searchUserForLogin = (email: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

//
export const searchUserAndUpdate = (
  filter: object,
  update: object,
  res: Response
) => {
  try {
    UserModel.findOneAndUpdate(filter, update).then((userUpdateResponse) => {
      res.send({
        success: true,
        message: responseMessages.USER_VERIFIED,
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findSpecificUser = (filter: object, res: Response) => {
  return new Promise((resolve) => {
    UserModel.findOne(filter).then((user) => {
      if (!user)  return res.status(statusCodes.UNAUTHORIZED).json({ message: responseMessages.PASSWORD_TOKEN_ERROR });
        resolve(user);
    });
  });
};
