"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoleAndService_controller_1 = require("../Controller/RoleAndService.controller");
const Rbac_middleware_1 = require("../middleware/Rbac.middleware");
const AuthHelper_1 = require("../Utils/AuthHelper");
const Service_validate_1 = require("../Validator/Service.validate");
const router = (0, express_1.Router)();
//<-------------------------------------------Get All Available Roles Route------------------------------->
router.get("/roles", RoleAndService_controller_1.getRolesListController);
// <------------------------------------------Get All Available Services Route----------------------------->
router.get("/services", AuthHelper_1.authenticateToken, RoleAndService_controller_1.getCategoryController);
//<-------------------------------------------Post New Service Category Route----------------------------->
router.post("/add/service", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1]), Service_validate_1.serviceValidator, RoleAndService_controller_1.postCategoryController);
exports.default = router;
