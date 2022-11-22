import { Request, Response, NextFunction } from "express";
import { responseMessages, statusCodes } from "../constant";
import {
  getAllAppliedRequests,
  getAllReceivedRequests,
} from "../Service/ProviderService.service";

// <--------------------------------------------------Get All Received Service Request Controller-------------------------->
export const getAllReceivedRequestsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const requestList = await getAllReceivedRequests(req.user._id);
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      message: responseMessages.ALL_REC_REQUEST,
      requestList,
    });
  } catch (error) {
    next(error);
  }
};
// <--------------------------------------------------Get All Applied Service Request Controller-------------------------->
export const getAllAppliedRequestsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const requestList = await getAllAppliedRequests(req.user._id);
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      message: responseMessages.ALL_REC_REQUEST,
      requestList,
    });
  } catch (error) {
    next(error);
  }
};
