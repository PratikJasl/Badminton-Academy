"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
//JOI schema for validating the incoming JSON data.
exports.locationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(20).required(),
    address: joi_1.default.string().min(5).max(50).required()
});
