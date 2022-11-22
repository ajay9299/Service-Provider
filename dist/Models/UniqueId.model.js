"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuidSchema = new mongoose_1.Schema({
    Uuid: { type: String, required: true, unique: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
});
exports.default = (0, mongoose_1.model)("uniqueId", uuidSchema);
