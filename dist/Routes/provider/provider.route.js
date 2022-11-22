"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provider_controller_1 = require("../../Controller/provider/provider.controller");
const router = (0, express_1.Router)();
router.post("/provider/createVendor", provider_controller_1.createVendorController);
exports.default = router;
