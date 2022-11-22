import { ObjectId } from "mongoose";
import { providerModel, ServiceRequestModel } from "../Models";
import ProviderModel, {
  IProviderModel,
} from "../Models/provider/Provider.model";
import { IServiceModel } from "../Models/Service.model";
import {
  IServiceRequest,
  IServiceRequestModel,
} from "../Models/ServiceRequest.model";
import { getCategoryService } from "./RoleAndService.service";

// <---------------------------------------Post New Service Order Service----------------------------------------------->
export const postNewServiceOrderService = async (
  newServiceOrder: IServiceRequest
): Promise<IServiceRequestModel | undefined> => {
  try {
    return await ServiceRequestModel.create(newServiceOrder);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <-----------------------------------------Get All Provider Based On Category Service---------------------------------->
export const getAllProviderByCategoryService = async (
  categoryId: ObjectId,
  filter: object
) => {
  try {
    return await providerModel.find(filter);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <-----------------------------------------Get All Received Request (User Role Provider ) Service------------------------------------->
export const getAllReceivedRequests = async (userId: ObjectId) => {
  try {
    await ServiceRequestModel.aggregate([{ $match: { to: userId } }]);
  } catch (error: any) {
    throw new Error(error);
  }
};
// <-----------------------------------------Get All Applied Request (User Role Consumer ) Service------------------------------------->
export const getAllAppliedRequests = async (
  userId: ObjectId
): Promise<IServiceRequestModel[] | undefined> => {
  try {
    return await ServiceRequestModel.aggregate([{ $match: { from: userId } }]);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <------------------------------------------Get All Running Services (Provider's)-------------------------------->
export const getProviderAllRunningService = async (
  filter: Object
): Promise<IProviderModel[]> => {
  try {
    return await ProviderModel.find(filter).populate([
      { path: "categoryId", select: "title" },
    ]);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <------------------------------------------Get All Not Registered CategoryList----------------------------------->
export const getNotRegisteredService = async (
  runningServiceList: IProviderModel[]
) => {
  try {
    // Fetch all available service/category list
    let allCategoryList = await getCategoryService();
    // filter not registered category list
    runningServiceList.map((service: IProviderModel | any, index: number) => {
      allCategoryList = allCategoryList.filter((category: IServiceModel) => {
        return !category._id.equals(service.categoryId._id);
      });
    });

    return allCategoryList;
  } catch (error: any) {
    throw new Error(error);
  }
};
