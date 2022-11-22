"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Services_controller_1 = require("../../Controller/Services/Services.controller");
const Rbac_middleware_1 = require("../../middleware/Rbac.middleware");
const AuthHelper_1 = require("../../Utils/AuthHelper");
const Service_validate_1 = require("../../Validator/Service.validate");
const router = (0, express_1.Router)();
// <-----------------------------------Get Service List By Category Route------------------------------------->
router.get("/service/getVendorById/:categoryId", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 3]), Services_controller_1.getVendorsByCategoryController);
// <-----------------------------------Add New ServiceRequest Route------------------------------------------>
router.post("/service/order-request", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 3]), Service_validate_1.serviceOrderValidator, Services_controller_1.postNewServiceOrderController);
// <-----------------------------------Get All Posted ServiceRequest Route----------------------------------->
router.get("/my-requests/:status", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 3]), Services_controller_1.getServiceRequestByStatusForConsumer);
// <-----------------------------------Get Request Order Route---------------------------------------->
router.get("/my-request/:requestId", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 3]), Services_controller_1.getRequestOrderDetailsByConsumer);
exports.default = router;
