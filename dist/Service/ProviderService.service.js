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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotRegisteredService = exports.getProviderAllRunningService = exports.getAllAppliedRequests = exports.getAllReceivedRequests = exports.getAllProviderByCategoryService = exports.postNewServiceOrderService = void 0;
const Models_1 = require("../Models");
const Provider_model_1 = __importDefault(require("../Models/provider/Provider.model"));
const RoleAndService_service_1 = require("./RoleAndService.service");
// <---------------------------------------Post New Service Order Service----------------------------------------------->
const postNewServiceOrderService = (newServiceOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Models_1.ServiceRequestModel.create(newServiceOrder);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.postNewServiceOrderService = postNewServiceOrderService;
// <-----------------------------------------Get All Provider Based On Category Service---------------------------------->
const getAllProviderByCategoryService = (categoryId, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Models_1.providerModel.find(filter);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllProviderByCategoryService = getAllProviderByCategoryService;
// <-----------------------------------------Get All Received Request (User Role Provider ) Service------------------------------------->
const getAllReceivedRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Models_1.ServiceRequestModel.aggregate([{ $match: { to: userId } }]);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllReceivedRequests = getAllReceivedRequests;
// <-----------------------------------------Get All Applied Request (User Role Consumer ) Service------------------------------------->
const getAllAppliedRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Models_1.ServiceRequestModel.aggregate([{ $match: { from: userId } }]);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllAppliedRequests = getAllAppliedRequests;
// <------------------------------------------Get All Running Services (Provider's)-------------------------------->
const getProviderAllRunningService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Provider_model_1.default.find(filter).populate([
            { path: "categoryId", select: "title" },
        ]);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getProviderAllRunningService = getProviderAllRunningService;
// <------------------------------------------Get All Not Registered CategoryList----------------------------------->
const getNotRegisteredService = (runningServiceList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all available service/category list
        let allCategoryList = yield (0, RoleAndService_service_1.getCategoryService)();
        // filter not registered category list
        runningServiceList.map((service, index) => {
            allCategoryList = allCategoryList.filter((category) => {
                return !category._id.equals(service.categoryId._id);
            });
        });
        return allCategoryList;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getNotRegisteredService = getNotRegisteredService;
