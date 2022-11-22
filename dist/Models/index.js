"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerModel = exports.UuidModel = exports.ServiceRequestModel = exports.ServiceModel = exports.RoleModel = exports.UserModel = void 0;
const User_model_1 = __importDefault(require("./User.model"));
exports.UserModel = User_model_1.default;
const Role_model_1 = __importDefault(require("./Role.model"));
exports.RoleModel = Role_model_1.default;
const Service_model_1 = __importDefault(require("./Service.model"));
exports.ServiceModel = Service_model_1.default;
const ServiceRequest_model_1 = __importDefault(require("./ServiceRequest.model"));
exports.ServiceRequestModel = ServiceRequest_model_1.default;
const UniqueId_model_1 = __importDefault(require("./UniqueId.model"));
exports.UuidModel = UniqueId_model_1.default;
const Provider_model_1 = __importDefault(require("./provider/Provider.model"));
exports.providerModel = Provider_model_1.default;
