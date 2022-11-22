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
exports.getAllAppliedRequestsController = exports.getAllReceivedRequestsController = void 0;
const constant_1 = require("../constant");
const ProviderService_service_1 = require("../Service/ProviderService.service");
// <--------------------------------------------------Get All Received Service Request Controller-------------------------->
const getAllReceivedRequestsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestList = yield (0, ProviderService_service_1.getAllReceivedRequests)(req.user._id);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            message: constant_1.responseMessages.ALL_REC_REQUEST,
            requestList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllReceivedRequestsController = getAllReceivedRequestsController;
// <--------------------------------------------------Get All Applied Service Request Controller-------------------------->
const getAllAppliedRequestsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestList = yield (0, ProviderService_service_1.getAllAppliedRequests)(req.user._id);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            message: constant_1.responseMessages.ALL_REC_REQUEST,
            requestList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAppliedRequestsController = getAllAppliedRequestsController;
