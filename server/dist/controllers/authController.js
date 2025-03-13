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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = signUp;
exports.logIn = logIn;
exports.logOut = logOut;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodeMailer_1 = __importDefault(require("../config/nodeMailer"));
const messages_1 = require("../common/messages");
const prisma = new client_1.PrismaClient();
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { fullName, age, gender, email, phone, password, role, joinDate, primaryLocation, coachingPlan } = req.body;
        console.log(fullName, age, gender, email, phone, password, role, joinDate, primaryLocation, coachingPlan);
        try {
            //Check for existing Users
            let existingUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            console.log("Existing User", existingUser);
            if (existingUser) {
                res.status(400).json({ success: "false", message: messages_1.ERROR_MESSAGES.EXISTING_USER });
                return;
            }
            //Hash Password and store the user data
            let hashedPassword = yield bcrypt_1.default.hash(password, 10);
            console.log("Hashed Password", hashedPassword);
            let newUser = yield prisma.user.create({
                data: {
                    fullName: fullName,
                    age: age,
                    gender: gender,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    role: role,
                    joinDate: joinDate,
                    primaryLocation: primaryLocation,
                    coachingPlan: coachingPlan
                }
            });
            console.log("New user created");
            //Generate JWT token and send it in response cookies.
            let token = jsonwebtoken_1.default.sign({ id: newUser.userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
            console.log("Token", token);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            //Send Acknowledgment Mail and Response
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome!! Thanks for Signing Up',
                text: `Hi ${fullName}👋, 
             We're thrilled to have you on board. Your account has been created with email id 📧: ${email}.
            
             Best Regards
             Pratik Jussal`
            };
            yield nodeMailer_1.default.sendMail(mailOptions);
            res.status(200).json({ success: true, message: messages_1.SUCCESS_MESSAGES.USER_CREATED });
            return;
        }
        catch (error) {
            res.status(500).json({ success: "false", message: messages_1.ERROR_MESSAGES.SERVER_ERROR, detail: error });
            return;
        }
    });
}
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function logOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
