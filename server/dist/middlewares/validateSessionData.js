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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocationData = validateLocationData;
exports.validateCoachingPlanData = validateCoachingPlanData;
exports.validateCoachingScheduleData = validateCoachingScheduleData;
const sessionSchems_1 = require("../schema/sessionSchems");
const messages_1 = require("../common/messages");
//Validate the data for the location send from the client.
function validateLocationData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address } = req.body;
        try {
            if (!name || !address) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
                return;
            }
            const { error, value } = yield sessionSchems_1.locationSchema.validateAsync(req.body);
            if (error) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.VALIDATION_FAILED, details: error.details });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, details: error });
            return;
        }
    });
}
//Validate the data for the coaching plan send from the client.
function validateCoachingPlanData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, planDuration, price } = req.body;
        try {
            if (!name || !description || !planDuration || !price) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
                return;
            }
            const { error, value } = yield sessionSchems_1.coachingPlanSchema.validateAsync(req.body);
            if (error) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.VALIDATION_FAILED, details: error.details });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, details: error });
            return;
        }
    });
}
//Validate the data for the coaching schedule send from the client.
function validateCoachingScheduleData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { coachingDays, coachingTime, coachingDuration } = req.body;
        try {
            if (!coachingDays || !coachingTime || !coachingDuration) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
                return;
            }
            const { error, value } = yield sessionSchems_1.coachingScheduleSchema.validateAsync(req.body);
            if (error) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.VALIDATION_FAILED, details: error.details });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, details: error });
            return;
        }
    });
}
