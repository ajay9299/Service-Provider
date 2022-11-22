"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserProfile_controller_1 = require("../Controller/UserProfile.controller");
const Rbac_middleware_1 = require("../middleware/Rbac.middleware");
const AuthHelper_1 = require("../Utils/AuthHelper");
const UserProfile_validator_1 = require("../Validator/UserProfile.validator");
const router = (0, express_1.Router)();
// <---------------------------------------Basic Profile Update Route------------------------------>
router.patch("/user/profile", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2, 3]), UserProfile_validator_1.basicProfileUpdateValidator, UserProfile_controller_1.userProfileUpdateController);
// <------------------------------------------Get User Profile Route----------------------------->
router.get("/user/profile", AuthHelper_1.authenticateToken, (0, Rbac_middleware_1.roleCheckerMiddleware)([1, 2, 3]), UserProfile_controller_1.getUseBasicProfileController);
exports.default = router;
