import e, { Router } from "express";
import {
  getCategoryController,
  getRolesListController,
  postCategoryController,
} from "../Controller/RoleAndService.controller";
import { roleCheckerMiddleware } from "../middleware/Rbac.middleware";
import { authenticateToken } from "../Utils/AuthHelper";
import { serviceValidator } from "../Validator/Service.validate";

const router = Router();

//<-------------------------------------------Get All Available Roles Route------------------------------->
router.get("/roles", getRolesListController);

// <------------------------------------------Get All Available Services Route----------------------------->
router.get("/services", authenticateToken, getCategoryController);

//<-------------------------------------------Post New Service Category Route----------------------------->
router.post(
  "/add/service",
  authenticateToken,
  roleCheckerMiddleware([1]),
  serviceValidator,
  postCategoryController
);

export default router;
