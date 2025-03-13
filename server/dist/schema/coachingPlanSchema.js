"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coachingPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.coachingPlanSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(20).required(),
    description: joi_1.default.string().min(5).max(100).required(),
    planDuration: joi_1.default.string().min(1).max(60).required(),
    price: joi_1.default.number().min(1).required(),
});
