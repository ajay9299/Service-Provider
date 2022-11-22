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
exports.getUseBasicProfileController = exports.userProfileUpdateController = void 0;
const constant_1 = require("../constant");
const UserProfile_service_1 = require("../Service/UserProfile.service");
// <------------------------------------------User Basic Profile Update Controller------------------------------>
const userProfileUpdateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserProfile_service_1.userProfileUpdateService)(req.user._id, req.body);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            message: constant_1.responseMessages.PROFILE_UP,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userProfileUpdateController = userProfileUpdateController;
// <----------------------------------------Get User Basic Profile Controller----------------------------------->
const getUseBasicProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield (0, UserProfile_service_1.getUserBasicProfileService)(req.user._id);
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            userData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUseBasicProfileController = getUseBasicProfileController;
