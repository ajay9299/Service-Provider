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
exports.getProviderAllRunningController = exports.getRequestOrderDetailsByProvider = exports.changeTheStatusOFRequestController = exports.getServiceRequestByStatus = exports.getCategoryForProviderController = exports.createVendorController = void 0;
const constant_1 = require("../../constant");
const Models_1 = require("../../Models");
const ProviderService_service_1 = require("../../Service/ProviderService.service");
// <----------------------------------------Create Vender Controller----------------------------------------->
const createVendorController = (req, res, next) => {
    const filter = { categoryId: req.body.categoryId, userId: req.body.userId };
    Models_1.providerModel.count(filter).then((countNum) => {
        if (countNum === 0) {
            Models_1.providerModel
                .create(req.body)
                .then((providerResponse) => {
                res.status(constant_1.statusCodes.SUCCESS).json({
                    success: true,
                    message: constant_1.responseMessages.VENDER_CREATED,
                    newlyServiceData: providerResponse,
                });
            })
                .catch((err) => {
                res.status(constant_1.statusCodes.BAD_REQUEST).json({
                    success: false,
                    message: constant_1.responseMessages.VENDER_NOT_CREATED,
                });
            });
        }
        else {
            res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: constant_1.responseMessages.VENDER_NOT_CREATED,
            });
        }
    });
};
exports.createVendorController = createVendorController;
// <----------------------------------------Get CategoryList In Order To Add Service (Provider) Controller-------------------------------->
const getCategoryForProviderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { userId: req.user._id };
        console.log(filter);
        const providerRunningServiceList = yield (0, ProviderService_service_1.getProviderAllRunningService)(filter);
        const finalRenderList = yield (0, ProviderService_service_1.getNotRegisteredService)(providerRunningServiceList);
        res.status(200).json({
            finalRenderList,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryForProviderController = getCategoryForProviderController;
const getServiceRequestByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.status)
        return res.send({ Success: false, message: "Invalid Input!" });
    let status = req.params.status.toLowerCase();
    let filter = {};
    if (status == "all") {
        filter = { to: req.user._id };
    }
    else {
        filter = { status: req.params.status, to: req.user._id };
    }
    const finalArray = yield Models_1.ServiceRequestModel.find(filter)
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
            path: "from",
            select: ["fullName", "address", "phoneNumber"],
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
exports.getServiceRequestByStatus = getServiceRequestByStatus;
// <----------------------------------------Change The Status Of Request Order----------------------------------->
const changeTheStatusOFRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.status && !req.params.requestId)
            return res.send({ Success: false, message: "Invalid Input!" });
        let status = req.params.status.toLowerCase();
        const requestOrder = yield Models_1.ServiceRequestModel.findById({
            _id: req.params.requestId,
        });
        if (!requestOrder) {
            return res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid requestId",
            });
        }
        if (requestOrder.status === "cancelled") {
            return res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid operation",
            });
        }
        if ((requestOrder.status === "accepted" && status === "completed") ||
            (requestOrder.status === "pending" && status === "accepted") ||
            status === "cancelled") {
            requestOrder.status = status;
            yield requestOrder.save();
            return res.status(constant_1.statusCodes.SUCCESS).json({
                success: true,
                message: "Status changed successfully",
            });
        }
        return res.status(constant_1.statusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid operation",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changeTheStatusOFRequestController = changeTheStatusOFRequestController;
// <-----------------------------------------Get Request Order Details-------------------------------------->
const getRequestOrderDetailsByProvider = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                path: "from",
                select: ["fullName", "address", "phoneNumber"],
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
exports.getRequestOrderDetailsByProvider = getRequestOrderDetailsByProvider;
// <-------------------------------------Get All Running Service By Provider-------------------------------->
const getProviderAllRunningController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const runningService = yield (0, ProviderService_service_1.getProviderAllRunningService)({
            userId: req.user._id,
        });
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            runningService,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProviderAllRunningController = getProviderAllRunningController;
