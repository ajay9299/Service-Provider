"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryController = exports.postCategoryController = exports.getRolesListController = void 0;
const constant_1 = require("../constant");
const RoleAndService_service_1 = require("../Service/RoleAndService.service");
// <----------------------------------------------Get RolesList Controller------------------------------------>
const getRolesListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, RoleAndService_service_1.getRolesService)();
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            roles,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getRolesListController = getRolesListController;
// <----------------------------------------------Post Service/Category Controller------------------------------------>
const postCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newlyCreatedCategory = yield (0, RoleAndService_service_1.postCategoryService)(req.body);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            newlyCreatedCategory,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postCategoryController = postCategoryController;
// <----------------------------------------------Get Service/Category Controller------------------------------------>
const getCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryList = yield (0, RoleAndService_service_1.getCategoryService)();
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            categoryList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryController = getCategoryController;
