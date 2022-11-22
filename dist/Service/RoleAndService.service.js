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
exports.getCategoryService = exports.postCategoryService = exports.getRolesService = void 0;
const constant_1 = require("../constant");
const Models_1 = require("../Models");
// <--------------------------------------Get RoleList Service------------------------------------------->
const getRolesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield Models_1.RoleModel.find()).filter((role) => role.roleId !== constant_1.uniqueIdes.ROLES.ADMIN);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getRolesService = getRolesService;
// <--------------------------------------Post Service/CategoryList Service------------------------------------------->
const postCategoryService = (categoryInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Models_1.ServiceModel.create(categoryInfo);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.postCategoryService = postCategoryService;
// <--------------------------------------Get Service/CategoryList Service------------------------------------------->
const getCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Models_1.ServiceModel.find();
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getCategoryService = getCategoryService;
