"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const validateLocationData_1 = require("../middlewares/validateLocationData");
const sessionRouter = (0, express_1.Router)();
exports.sessionRouter = sessionRouter;
sessionRouter.post('/session/add-location', validateLocationData_1.validateLocationData, sessionController_1.addLocation);
