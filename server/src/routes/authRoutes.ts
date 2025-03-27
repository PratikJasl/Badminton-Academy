import { Router } from "express";
import { validateUserData } from "../middlewares/validateUserData";
import { logIn, logOut, signUp, sendVerifyOTP, verifyEmail, sendResetPasswordOTP, resetPassword } from "../controllers/authController";
import { userAuth } from "../middlewares/userAuth";

const authRouter = Router();


authRouter.post('/auth/signup',validateUserData, signUp);
authRouter.post('/auth/login', logIn);
authRouter.post('/auth/logout', logOut);
authRouter.post('/auth/verify-otp', userAuth, sendVerifyOTP);
authRouter.post('/auth/verify-email', userAuth, verifyEmail);
authRouter.post('/auth/send-reset-otp', sendResetPasswordOTP);
authRouter.post('/auth/reset-password', resetPassword);

export {authRouter}