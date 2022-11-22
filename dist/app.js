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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const Routes_1 = __importDefault(require("./Routes"));
const fs_1 = __importDefault(require("fs"));
const ngrok_1 = __importDefault(require("ngrok"));
const cors_1 = __importDefault(require("cors"));
const constant_1 = require("./constant");
// import library and files
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDocument = JSON.parse(fs_1.default.readFileSync("./swagger.json", "utf-8"));
const customCss = fs_1.default.readFileSync(process.cwd() + "/swagger.css", "utf8");
require("./Db/Connection");
// Crate the express application
const app = (0, express_1.default)();
const PORT = config_1.default.get("PORT");
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Trigger the ngRok
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        ngrok_1.default
            .connect(PORT)
            .then((url) => console.log(url))
            .catch((err) => console.log(err.body));
    });
})();
// Log the apis hits on server
app.use((req, res, next) => {
    const hitApi = `${req.method} ${req.url}`;
    console.log(hitApi, "\n|\nv\n|\nv\n|\nv");
    next();
});
// let express to use this
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, { customCss }));
// Use app routes
app.use("/api", Routes_1.default);
// This should be the last route else any after it wont work
app.use("*", (req, res) => {
    res.status(constant_1.statusCodes.NOT_FOUND).json({
        success: false,
        message: constant_1.responseMessages.ROUTE_NOT_FOUND,
    });
});
app.use((err, req, res, next) => {
    const statusCode = req.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        errorMessage: err.stack,
    });
});
// Server up on provided port number
app.listen(PORT, () => console.log(`===== Server Up On PORT ${PORT} =====`));
