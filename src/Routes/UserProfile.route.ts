import { Router } from "express";
import {
  getUseBasicProfileController,
  userProfileUpdateController,
} from "../Controller/UserProfile.controller";
import { roleCheckerMiddleware } from "../middleware/Rbac.middleware";
import { authenticateToken } from "../Utils/AuthHelper";
import { basicProfileUpdateValidator } from "../Validator/UserProfile.validator";

const router = Router();

// <---------------------------------------Basic Profile Update Route------------------------------>
router.patch(
  "/user/profile",
  authenticateToken,
  roleCheckerMiddleware([1, 2, 3]),
  basicProfileUpdateValidator,
  userProfileUpdateController
);

// <------------------------------------------Get User Profile Route----------------------------->
router.get(
  "/user/profile",
  authenticateToken,
  roleCheckerMiddleware([1, 2, 3]),
  getUseBasicProfileController
);

export default router;
