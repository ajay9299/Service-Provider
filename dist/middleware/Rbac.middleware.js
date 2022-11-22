"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheckerMiddleware = void 0;
const constant_1 = require("../constant");
// <--------------------------------------Role Base Access Control----------------------------------------->
const roleCheckerMiddleware = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        }
        else {
            return res.status(constant_1.statusCodes.FORBIDDEN).json({
                success: false,
                message: constant_1.responseMessages.USER_NOT_ALLOWED,
            });
        }
    };
};
exports.roleCheckerMiddleware = roleCheckerMiddleware;
