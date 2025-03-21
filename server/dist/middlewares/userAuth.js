"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../common/messages");
function userAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ success: "false", message: messages_1.ERROR_MESSAGES.NOT_AUTH });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(401).json({ success: "false", message: messages_1.ERROR_MESSAGES.JWT_SECRET_ERROR });
            return;
        }
        const tokenDecode = jsonwebtoken_1.default.verify(token, secret);
        if (tokenDecode && typeof tokenDecode === 'object' && 'id' in tokenDecode) {
            req.body.userId = tokenDecode.id;
        }
        else {
            res.status(401).json({ success: "false", message: messages_1.ERROR_MESSAGES.NOT_AUTH });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, details: error });
        return;
    }
}
