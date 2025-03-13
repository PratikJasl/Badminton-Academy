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
                    name: name,
                    address: address
                }
            });
            res.status(200).json({ success: "true", message: messages_1.SUCCESS_MESSAGES.LOCATION_ADDED, detail: newLocation });
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
                    name: name,
                    description: description,
                    planDuration: planDuration,
                    price: price
                }
            });
            res.status(200).json({ success: "true", message: messages_1.SUCCESS_MESSAGES.COACHING_PLAN_ADDED, detail: newCoachingPlan });
            return;
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, detail: error });
            return;
        }
    });
}
