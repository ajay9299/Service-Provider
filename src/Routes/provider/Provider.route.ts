import { Router } from "express";
import {
  changeTheStatusOFRequestController,
  createVendorController,
  getCategoryForProviderController,
  getProviderAllRunningController,
  getRequestOrderDetailsByProvider,
  getServiceRequestByStatus,
} from "../../Controller/provider/provider.controller";
import { roleCheckerMiddleware } from "../../middleware/Rbac.middleware";
import { authenticateToken } from "../../Utils/AuthHelper";
import { createProviderValidator } from "../../Validator/Provider/Provider.validate";
const router = Router();

router.post(
  "/provider/createVendor",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  createProviderValidator,
  createVendorController
);

// <--------------------Get CategoryList In Order To Add New Service (Provider) Route-------------------->
router.get(
  "/provider/categories",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  getCategoryForProviderController
);

// <--------------------------------------------Get Vendors Route---------------------------------------->
router.get(
  "/provider/getRequestByStatus/:status",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  getServiceRequestByStatus
);

// <---------------------------------------------Change The Status Of Order Route------------------------>
router.patch(
  "/provider/updateStatus/:requestId/:status",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  changeTheStatusOFRequestController
);

// <---------------------------------------------Get The Request Order Details--------------------------->
router.get(
  "/provider/requestOrder/:requestId",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  getRequestOrderDetailsByProvider
);

// <---------------------------------------------Get My All Running Service Route------------------------>
router.get(
  "/provider/runningServices",
  authenticateToken,
  roleCheckerMiddleware([1, 2]),
  getProviderAllRunningController
);

export default router;
