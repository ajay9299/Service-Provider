import { Request, Response, NextFunction } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import { responseMessages, statusCodes } from "../../constant";
import { ServiceRequestModel } from "../../Models";
import {
  getAllProviderByCategoryService,
  postNewServiceOrderService,
} from "../../Service/ProviderService.service";

// <----------------------------------------Get Vendor List By Category Controller------------------------>
export const getVendorsByCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const categoryId: any = req.params.categoryId;
    if (!categoryId || !isValidObjectId(categoryId)) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: `${responseMessages.INVALID_PARAMS}, categoryId`,
      });
    }
    const filter = { categoryId: categoryId };
    const providerList = await getAllProviderByCategoryService(
      categoryId as ObjectId,
      filter
    );
    return res.status(statusCodes.SUCCESS).json({
      providerList,
    });
  } catch (error) {
    next(error);
  }
};

// <----------------------------------------Post New Service Order Controller------------------------>
export const postNewServiceOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const newlyCreatedServiceRequest = await postNewServiceOrderService(
      req.body
    );
    return res.status(statusCodes.SUCCESS).json({
      newlyCreatedServiceRequest,
    });
  } catch (error) {
    next(error);
  }
};

// <--------------------------------------------------Get All Applied Request Orders------------------------------->
export const getServiceRequestByStatusForConsumer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.status)
    return res.send({ Success: false, message: "Invalid Input!" });
  let status = req.params.status.toLowerCase();
  let filter = {};
  if (status == "all") {
    filter = { from: req.user._id };
  } else {
    filter = { status: req.params.status, from: req.user._id };
  }
  await ServiceRequestModel.find(filter)
    .populate([
      {
        path: "providerServiceId",
        populate: {
          path: "categoryId",
          select: "title",
        },
        select: "categoryId",
      },
      {
        path: "to",
        select: ["fullName"],
      },
    ])
    .then((requestResponse) => {
      if (requestResponse.length === 0)
        return res.send({
          Success: false,
          message: "No requests For the user",
        });
      res.send({ Success: true, body: requestResponse });
    });
};

// <-----------------------------------------Get Request Order Details-------------------------------------->
export const getRequestOrderDetailsByConsumer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.requestId) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid requestId",
      });
    }

    await ServiceRequestModel.findById({
      _id: req.params.requestId,
    })
      .populate([
        {
          path: "providerServiceId",
          populate: {
            path: "categoryId",
            select: "title",
          },
          select: "categoryId",
        },
        {
          path: "to",
          select: "fullName",
        },
      ])
      .then((requestResponse) => {
        if (!requestResponse)
          return res.send({
            Success: false,
            message: "No requests For the user",
          });
        res.send({ Success: true, body: requestResponse });
      });
  } catch (error) {
    next(error);
  }
};
