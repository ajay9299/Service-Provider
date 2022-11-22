import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../constant";
import {
  getCategoryService,
  getRolesService,
  postCategoryService,
} from "../Service/RoleAndService.service";

// <----------------------------------------------Get RolesList Controller------------------------------------>
export const getRolesListController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const roles = await getRolesService();
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      roles,
    });
  } catch (error) {
    next(error);
  }
};
// <----------------------------------------------Post Service/Category Controller------------------------------------>
export const postCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const newlyCreatedCategory = await postCategoryService(req.body);
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      newlyCreatedCategory,
    });
  } catch (error) {
    next(error);
  }
};
// <----------------------------------------------Get Service/Category Controller------------------------------------>
export const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const categoryList = await getCategoryService();
    return res.status(statusCodes.SUCCESS).json({
      success: true,
      categoryList,
    });
  } catch (error) {
    next(error);
  }
};
