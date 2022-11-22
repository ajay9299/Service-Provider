import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { responseMessages, statusCodes } from "../../constant";
import { providerModel, ServiceRequestModel } from "../../Models";
import ProviderModel, {
  IProviderModel,
} from "../../Models/provider/Provider.model";
import {
  IServiceRequest,
  IServiceRequestModel,
} from "../../Models/ServiceRequest.model";
import {
  getNotRegisteredService,
  getProviderAllRunningService,
} from "../../Service/ProviderService.service";

// <----------------------------------------Create Vender Controller----------------------------------------->
export const createVendorController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter = { categoryId: req.body.categoryId, userId: req.body.userId };
  providerModel.count(filter).then((countNum) => {
    if (countNum === 0) {
      providerModel
        .create(req.body)
        .then((providerResponse) => {
          res.status(statusCodes.SUCCESS).json({
            success: true,
            message: responseMessages.VENDER_CREATED,
            newlyServiceData: providerResponse,
          });
        })
        .catch((err) => {
          res.status(statusCodes.BAD_REQUEST).json({
            success: false,
            message: responseMessages.VENDER_NOT_CREATED,
          });
        });
    } else {
      res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: responseMessages.VENDER_NOT_CREATED,
      });
    }
  });
};

// <----------------------------------------Get CategoryList In Order To Add Service (Provider) Controller-------------------------------->
export const getCategoryForProviderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: object = { userId: req.user._id };

    console.log(filter);

    const providerRunningServiceList: IProviderModel[] =
      await getProviderAllRunningService(filter);
    const finalRenderList = await getNotRegisteredService(
      providerRunningServiceList
    );

    res.status(200).json({
      finalRenderList,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceRequestByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.status)
    return res.send({ Success: false, message: "Invalid Input!" });
  let status = req.params.status.toLowerCase();
  let filter = {};
  if (status == "all") {
    filter = { to: req.user._id };
  } else {
    filter = { status: req.params.status, to: req.user._id };
  }
  const finalArray = await ServiceRequestModel.find(filter)
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
        path: "from",
        select: ["fullName", "address", "phoneNumber"],
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

// <----------------------------------------Change The Status Of Request Order----------------------------------->
export const changeTheStatusOFRequestController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.status && !req.params.requestId)
      return res.send({ Success: false, message: "Invalid Input!" });

    let status = req.params.status.toLowerCase();

    const requestOrder: any = await ServiceRequestModel.findById({
      _id: req.params.requestId,
    });

    if (!requestOrder) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid requestId",
      });
    }

    if (requestOrder.status === "cancelled") {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid operation",
      });
    }

    if (
      (requestOrder.status === "accepted" && status === "completed") ||
      (requestOrder.status === "pending" && status === "accepted") ||
      status === "cancelled"
    ) {
      requestOrder.status = status;
      await requestOrder.save();
      return res.status(statusCodes.SUCCESS).json({
        success: true,
        message: "Status changed successfully",
      });
    }
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid operation",
    });
  } catch (error) {
    next(error);
  }
};

// <-----------------------------------------Get Request Order Details-------------------------------------->
export const getRequestOrderDetailsByProvider = async (
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
          path: "from",
          select: ["fullName", "address", "phoneNumber"],
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

// <-------------------------------------Get All Running Service By Provider-------------------------------->
export const getProviderAllRunningController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const runningService = await getProviderAllRunningService({
      userId: req.user._id,
    });

    return res.status(statusCodes.SUCCESS).json({
      success: true,
      runningService,
    });
  } catch (error) {
    next(error);
  }
};
