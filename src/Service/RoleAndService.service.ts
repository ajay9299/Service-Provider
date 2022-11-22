import { uniqueIdes } from "../constant";
import { RoleModel, ServiceModel } from "../Models";
import { IServiceModel } from "../Models/Service.model";

// <--------------------------------------Get RoleList Service------------------------------------------->
export const getRolesService = async (): Promise<any> => {
  try {
    return (await RoleModel.find()).filter(
      (role) => role.roleId !== uniqueIdes.ROLES.ADMIN
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

// <--------------------------------------Post Service/CategoryList Service------------------------------------------->
export const postCategoryService = async (
  categoryInfo: IServiceModel
): Promise<any> => {
  try {
    return await ServiceModel.create(categoryInfo);
  } catch (error: any) {
    throw new Error(error);
  }
};

// <--------------------------------------Get Service/CategoryList Service------------------------------------------->
export const getCategoryService = async (): Promise<IServiceModel | any> => {
  try {
    return await ServiceModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};
