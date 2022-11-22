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
exports.getRequestOrderDetailsByConsumer = exports.getServiceRequestByStatusForConsumer = exports.postNewServiceOrderController = exports.getVendorsByCategoryController = void 0;
const mongoose_1 = require("mongoose");
const constant_1 = require("../../constant");
const Models_1 = require("../../Models");
const ProviderService_service_1 = require("../../Service/ProviderService.service");
// <----------------------------------------Get Vendor List By Category Controller------------------------>
const getVendorsByCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId || !(0, mongoose_1.isValidObjectId)(categoryId)) {
            return res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: `${constant_1.responseMessages.INVALID_PARAMS}, categoryId`,
            });
        }
        const filter = { categoryId: categoryId };
        const providerList = yield (0, ProviderService_service_1.getAllProviderByCategoryService)(categoryId, filter);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            providerList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getVendorsByCategoryController = getVendorsByCategoryController;
// <----------------------------------------Post New Service Order Controller------------------------>
const postNewServiceOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newlyCreatedServiceRequest = yield (0, ProviderService_service_1.postNewServiceOrderService)(req.body);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            newlyCreatedServiceRequest,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.postNewServiceOrderController = postNewServiceOrderController;
// <--------------------------------------------------Get All Applied Request Orders------------------------------->
const getServiceRequestByStatusForConsumer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.status)
        return res.send({ Success: false, message: "Invalid Input!" });
    let status = req.params.status.toLowerCase();
    let filter = {};
    if (status == "all") {
        filter = { from: req.user._id };
    }
    else {
        filter = { status: req.params.status, from: req.user._id };
    }
    yield Models_1.ServiceRequestModel.find(filter)
        .populate([
        {
            path: "providerServiceId",
            populate: {
                path: "categoryId",
                select: "title",
            },
            select: "categoryId",
        },
        {
            path: "to",
            select: ["fullName"],
        },
    ])
        .then((requestResponse) => {
        if (requestResponse.length === 0)
            return res.send({
                Success: false,
                message: "No requests For the user",
            });
        res.send({ Success: true, body: requestResponse });
    });
});
exports.getServiceRequestByStatusForConsumer = getServiceRequestByStatusForConsumer;
// <-----------------------------------------Get Request Order Details-------------------------------------->
const getRequestOrderDetailsByConsumer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.requestId) {
            return res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid requestId",
            });
        }
        yield Models_1.ServiceRequestModel.findById({
            _id: req.params.requestId,
        })
            .populate([
            {
                path: "providerServiceId",
                populate: {
                    path: "categoryId",
                    select: "title",
                },
                select: "categoryId",
            },
            {
                path: "to",
                select: "fullName",
            },
        ])
            .then((requestResponse) => {
            if (!requestResponse)
                return res.send({
                    Success: false,
                    message: "No requests For the user",
                });
            res.send({ Success: true, body: requestResponse });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getRequestOrderDetailsByConsumer = getRequestOrderDetailsByConsumer;
