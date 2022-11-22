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
exports.findSpecificUser = exports.searchUserAndUpdate = exports.searchUserForLogin = exports.userSearchByEmail = exports.signUpService = void 0;
const User_model_1 = __importDefault(require("../Models/User.model"));
const AuthHelper_1 = require("../Utils/AuthHelper");
const constant_1 = require("../constant");
//Mailer
// import { isEmailServiceReady } from "../Service/email.service";
//UUID
const uuid_1 = require("uuid");
const Models_1 = require("../Models");
const email_service_1 = require("./email.service");
// <--------------------------------------------SignUp Service------------------------------------------->
const signUpService = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userInfo.password = yield (0, AuthHelper_1.hashedPassword)(userInfo.password);
        const newlyCreatedUser = yield User_model_1.default.create(userInfo);
        const userEVId = (0, uuid_1.v4)();
        yield Models_1.UuidModel.create({ Uuid: userEVId, userId: newlyCreatedUser._id });
        (0, email_service_1.isEmailServiceReady)(userEVId, userInfo.email);
        return newlyCreatedUser;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signUpService = signUpService;
// <---------------------------------------------User Search By Email & PhoneNumber Service-------------->
const userSearchByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield User_model_1.default.findOne({ email })) ? true : false;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.userSearchByEmail = userSearchByEmail;
// <**********************************User Search By Email Service for Login ***********************************>
const searchUserForLogin = (email) => {
    try {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOne({ email })
                .then((user) => {
                resolve(user);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.searchUserForLogin = searchUserForLogin;
//
const searchUserAndUpdate = (filter, update, res) => {
    try {
        User_model_1.default.findOneAndUpdate(filter, update).then((userUpdateResponse) => {
            res.send({
                success: true,
                message: constant_1.responseMessages.USER_VERIFIED,
            });
        });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.searchUserAndUpdate = searchUserAndUpdate;
const findSpecificUser = (filter, res) => {
    return new Promise((resolve) => {
        User_model_1.default.findOne(filter).then((user) => {
            if (!user)
                return res.status(constant_1.statusCodes.UNAUTHORIZED).json({ message: constant_1.responseMessages.PASSWORD_TOKEN_ERROR });
            resolve(user);
        });
    });
};
exports.findSpecificUser = findSpecificUser;
