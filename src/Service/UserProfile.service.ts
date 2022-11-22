import mongoose from "mongoose";
import UserModel, { IUser, IUserModel } from "../Models/User.model";

export const userProfileUpdateService = async (
  userId: mongoose.ObjectId,
  userInfo: Object
): Promise<boolean> => {
  try {
    await UserModel.findByIdAndUpdate({ _id: userId }, userInfo);
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserBasicProfileService = async (
  userId: mongoose.ObjectId
): Promise<IUserModel | undefined> => {
  try {
    return (await UserModel.findById({ _id: userId },{password:0,})) as IUserModel;
  } catch (error: any) {
    throw new Error(error);
  }
};
