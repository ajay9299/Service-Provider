"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    isActivate: { type: Boolean, default: true },
    numberOfVender: { type: Number, default: 0 },
    image: { type: Buffer, default: null },
    desc: { type: String, default: null }, // Description of service
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)("Service", ServiceSchema);
