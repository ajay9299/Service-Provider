"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = require("../../Controller/provider/provider.controller");
const Rbac_middleware_1 = require("../../middleware/Rbac.middleware");
const AuthHelper_1 = require("../../Utils/AuthHelper");
const Provider_validate_1 = require("../../Validator/Provider/Provider.validate");
const router = (0, express_1.Router)();
router.post("/provider/createVendor", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), Provider_validate_1.createProviderValidator, provider_controller_1.createVendorController);
// <--------------------Get CategoryList In Order To Add New Service (Provider) Route-------------------->
router.get("/provider/categories", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), provider_controller_1.getCategoryForProviderController);
// <--------------------------------------------Get Vendors Route---------------------------------------->
router.get("/provider/getRequestByStatus/:status", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), provider_controller_1.getServiceRequestByStatus);
// <---------------------------------------------Change The Status Of Order Route------------------------>
router.patch("/provider/updateStatus/:requestId/:status", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), provider_controller_1.changeTheStatusOFRequestController);
// <---------------------------------------------Get The Request Order Details--------------------------->
router.get("/provider/requestOrder/:requestId", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), provider_controller_1.getRequestOrderDetailsByProvider);
// <---------------------------------------------Get My All Running Service Route------------------------>
router.get("/provider/runningServices", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2]), provider_controller_1.getProviderAllRunningController);
exports.default = router;
