"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
//JOI schema for validating the incoming JSON data.
exports.userSchema = joi_1.default.object({
    fullName: joi_1.default.string().min(3).max(50).required(),
    age: joi_1.default.number().min(1).max(100).required(),
    gender: joi_1.default.string().valid('male', 'female', 'other').required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().min(10).max(15).required(),
    password: joi_1.default.string().min(4).max(20).required(),
    role: joi_1.default.string().required(),
    joinDate: joi_1.default.date(),
    primaryLocation: joi_1.default.string(),
    coachingPlan: joi_1.default.string()
});
