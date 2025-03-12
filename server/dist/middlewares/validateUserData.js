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
exports.validateUserData = validateUserData;
const userSchema_1 = require("../schema/userSchema");
const errors_1 = require("../common/errors");
function validateUserData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fullName, age, gender, email, phone, password, role, joinDate, primaryLocation, coachingPlan } = req.body;
        try {
            if (!fullName || !age || !gender || !email || !phone || !password || !role || !joinDate || !primaryLocation || !coachingPlan) {
                console.log(errors_1.ERROR_MESSAGES.MISSING_FIELD);
                res.status(400).json({ success: "false", message: errors_1.ERROR_MESSAGES.MISSING_FIELD });
                return;
            }
            const { error, value } = yield userSchema_1.userSchema.validateAsync(req.body);
            if (error) {
                res.status(400).json({ success: "false", message: errors_1.ERROR_MESSAGES.VALIDATION_FAILED, details: error.details });
                return;
            }
            next();
        }
        catch (error) {
            res.status(500).json({ success: "false", message: errors_1.ERROR_MESSAGES.SERVER_ERROR, details: error });
            return;
        }
    });
}
