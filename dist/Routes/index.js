"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// <-----------------------------------Import The Routes Files Present In This App-------------------------------->
const User_route_1 = __importDefault(require("./User.route"));
const UserProfile_route_1 = __importDefault(require("./UserProfile.route"));
const RolesAndService_route_1 = __importDefault(require("./RolesAndService.route"));
const Provider_route_1 = __importDefault(require("./provider/Provider.route"));
const Service_route_1 = __importDefault(require("./Service/Service.route"));
const appRouter = (0, express_1.Router)();
appRouter.use("/v1", User_route_1.default, UserProfile_route_1.default, RolesAndService_route_1.default, Provider_route_1.default, Service_route_1.default);
exports.default = appRouter;
