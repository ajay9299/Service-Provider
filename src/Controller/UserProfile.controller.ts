import { Request, Response, NextFunction } from "express";
import { responseMessages, statusCodes } from "../constant";
import { IUserModel } from "../Models/User.model";
import {
  getUserBasicProfileService,
  userProfileUpdateService,
} from "../Service/UserProfile.service";

// <------------------------------------------User Basic Profile Update Controller------------------------------>
export const userProfileUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    await userProfileUpdateService(req.user._id, req.body);
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      message: responseMessages.PROFILE_UP,
    });
  } catch (error: any) {
    next(error);
  }
};

// <----------------------------------------Get User Basic Profile Controller----------------------------------->
export const getUseBasicProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userData:IUserModel = await getUserBasicProfileService(req.user._id) as IUserModel;
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      userData,
    });
  } catch (error: any) {
    next(error);
  }
};
