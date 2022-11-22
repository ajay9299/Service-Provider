"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProviderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    categoryId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    vendorName: { type: String, required: true },
    experience: { type: Number, required: true },
    details: { type: String, required: true },
    cost: { type: Number, required: true },
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)("Provider", ProviderSchema);
