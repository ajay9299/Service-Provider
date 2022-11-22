"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceRequestModel = new mongoose_1.Schema({
    from: { type: mongoose_1.Types.ObjectId, ref: "User", require: true },
    to: { type: mongoose_1.Types.ObjectId, ref: "User", require: true },
    providerServiceId: { type: mongoose_1.Types.ObjectId, ref: "Provider", require: true },
    status: {
        type: String,
        enum: ["pending", "accepted", "completed", "cancelled"],
        default: "pending",
    },
    desc: { type: String, default: null },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("ServiceRequest", ServiceRequestModel);
