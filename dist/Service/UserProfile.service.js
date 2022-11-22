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
exports.getUserBasicProfileService = exports.userProfileUpdateService = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const userProfileUpdateService = (userId, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_model_1.default.findByIdAndUpdate({ _id: userId }, userInfo);
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.userProfileUpdateService = userProfileUpdateService;
const getUserBasicProfileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield User_model_1.default.findById({ _id: userId }, { password: 0, }));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserBasicProfileService = getUserBasicProfileService;
