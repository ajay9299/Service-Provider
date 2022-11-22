import { Router } from "express";
import {
  getRequestOrderDetailsByConsumer,
  getServiceRequestByStatusForConsumer,
  getVendorsByCategoryController,
  postNewServiceOrderController,
} from "../../Controller/Services/Services.controller";
import { roleCheckerMiddleware } from "../../middleware/Rbac.middleware";
import { authenticateToken } from "../../Utils/AuthHelper";
import { serviceOrderValidator } from "../../Validator/Service.validate";
const router = Router();

// <-----------------------------------Get Service List By Category Route------------------------------------->
router.get(
  "/service/getVendorById/:categoryId",
  authenticateToken,
  roleCheckerMiddleware([1, 3]),
  getVendorsByCategoryController
);

// <-----------------------------------Add New ServiceRequest Route------------------------------------------>
router.post(
  "/service/order-request",
  authenticateToken,
  roleCheckerMiddleware([1, 3]),
  serviceOrderValidator,
  postNewServiceOrderController
);

// <-----------------------------------Get All Posted ServiceRequest Route----------------------------------->
router.get(
  "/my-requests/:status",
  authenticateToken,
  roleCheckerMiddleware([1, 3]),
  getServiceRequestByStatusForConsumer
);

// <-----------------------------------Get Request Order Route---------------------------------------->
router.get(
  "/my-request/:requestId",
  authenticateToken,
  roleCheckerMiddleware([1, 3]),
  getRequestOrderDetailsByConsumer
);

export default router;
