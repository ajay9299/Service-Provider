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
exports.emailVerification = exports.loginController = exports.signUpController = void 0;
const constant_1 = require("../constant");
const AuthHelper_1 = require("../Utils/AuthHelper");
const User_service_1 = require("../Service/User.service");
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Models_1 = require("../Models");
const SECRET_KEY = config_1.default.get("SECRET_KEY");
// <----------------------------------------SignUp Controller--------------------------------------->
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserAlready = yield (0, User_service_1.userSearchByEmail)(req.body.email.toLowerCase());
        if (isUserAlready) {
            return res.status(constant_1.statusCodes.BAD_REQUEST).json({
                success: false,
                message: constant_1.responseMessages.USER_ALREADY_PRESENT,
            });
        }
        // convert email to lower case
        req.body.email = req.body.email.toLowerCase();
        const { fullName, gender, _id, email, role } = (yield (0, User_service_1.signUpService)(req.body));
        return res.status(constant_1.statusCodes.SUCCESS).json({
            success: true,
            message: constant_1.responseMessages.USER_CREATED,
            newlyCreatedUser: { _id, fullName, gender, role, email },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signUpController = signUpController;
const loginController = (req, res, next) => {
    (0, User_service_1.searchUserForLogin)(req.body.email.toLowerCase())
        .then((result) => {
        (0, AuthHelper_1.comparePassword)(req.body.password, result.password).then((pass) => {
            if (pass) {
                if (result.isEmailVerified) {
                    const payload = {
                        email: result.email,
                        role: result.role,
                        isProfileCompleted: result.isProfileCompleted,
                        _id: result._id,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY);
                    res.send({
                        success: true,
                        auth: token,
                        expiresIn: "15min",
                        expiresInMS: "900000",
                    });
                }
                else {
                    (0, AuthHelper_1.responseError)(constant_1.responseMessages.NOT_VERIFIED_USER, res);
                }
            }
            else {
                (0, AuthHelper_1.responseError)(constant_1.responseMessages.WRONG_PASSWORD, res);
            }
        });
    })
        .catch((userError) => {
        (0, AuthHelper_1.responseError)(constant_1.responseMessages.NOT_FOUND, res);
    });
};
exports.loginController = loginController;
const emailVerification = (req, res, next) => {
    Models_1.UuidModel.findOne({ Uuid: req.params.Uuid }, "userId")
        .then((userIdRes) => {
        if (!userIdRes) {
            return (0, AuthHelper_1.responseError)(constant_1.responseMessages.INVALID_USER, res);
        }
        else {
            const filter = { _id: userIdRes === null || userIdRes === void 0 ? void 0 : userIdRes.userId };
            const update = { isEmailVerified: true };
            (0, User_service_1.searchUserAndUpdate)(filter, update, res);
        }
    })
        .catch((error) => {
        (0, AuthHelper_1.responseError)(constant_1.responseMessages.INVALID_USER, res);
    });
};
exports.emailVerification = emailVerification;
