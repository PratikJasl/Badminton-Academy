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
exports.addLocation = addLocation;
exports.addCoachingPlan = addCoachingPlan;
exports.addCoachingSchedule = addCoachingSchedule;
const client_1 = require("@prisma/client");
const messages_1 = require("../common/messages");
const prisma = new client_1.PrismaClient();
//Add a new location to the database.
function addLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address } = req.body;
        if (!name || !address) {
            res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
            return;
        }
        try {
            let newLocation = yield prisma.location.create({
                data: {
                    name: name.trim(),
                    address: address.trim()
                }
            });
            res.status(201).json({ success: "true", message: messages_1.SUCCESS_MESSAGES.LOCATION_ADDED, detail: newLocation });
            return;
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, detail: error });
            return;
        }
    });
}
//Add a new coaching plan to the database.
function addCoachingPlan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, planDuration, price } = req.body;
        if (!name || !description || !planDuration || !price) {
            res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
            return;
        }
        try {
            let newCoachingPlan = yield prisma.coachingPlan.create({
                data: {
                    name: name.trim(),
                    description: description.trim(),
                    planDuration: planDuration.trim(),
                    price: price
                }
            });
            res.status(201).json({ success: "true", message: messages_1.SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingPlan });
            return;
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, detail: error });
            return;
        }
    });
}
//Add a new coaching schedule to the database.
function addCoachingSchedule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { coachingDays, coachingTime, coachingDuration, locationId } = req.body;
        if (!coachingDays || !coachingTime || !coachingDuration || !locationId) {
            res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.MISSING_FIELD });
            return;
        }
        try {
            let location = yield prisma.location.findUnique({
                where: { locationId: locationId }
            });
            if (!location) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.INVALID_LOCATION_ID });
                return;
            }
            let newCoachingSchedule = yield prisma.coachingSchedule.create({
                data: {
                    coachingDays: coachingDays,
                    coachingTime: coachingTime.trim(),
                    coachingDuration: coachingDuration.trim(),
                    location: {
                        connect: { locationId: locationId }
                    }
                }
            });
            res.status(201).json({ success: "true", message: messages_1.SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingSchedule });
            return;
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, detail: error });
            return;
        }
    });
}
