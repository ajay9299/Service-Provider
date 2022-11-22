"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
// Connect to the mongodb server
const DB_URL = config_1.default.get("DB.URL");
mongoose_1.default
    .connect(DB_URL, {})
    .then(() => {
    console.log(`===== DB Connected Successfully =====`);
})
    .catch((error) => {
    console.log(error);
});
