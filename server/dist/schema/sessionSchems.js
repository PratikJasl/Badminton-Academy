"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coachingScheduleSchema = exports.locationSchema = exports.coachingPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
//Schema for validating Coaching Plans.
exports.coachingPlanSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(20).required(),
    description: joi_1.default.string().min(5).max(100).required(),
    planDuration: joi_1.default.string().min(1).max(60).required(),
    price: joi_1.default.number().min(1).required(),
});
//Schema for validating Coaching Locations.
exports.locationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(20).required(),
    address: joi_1.default.string().min(5).max(50).required()
});
//Schema for validating Coaching Schedule.
exports.coachingScheduleSchema = joi_1.default.object({
    coachingDays: joi_1.default.array().required(),
    coachingTime: joi_1.default.string().min(3).max(10).required(),
    coachingDuration: joi_1.default.string().min(1).max(10).required()
});
