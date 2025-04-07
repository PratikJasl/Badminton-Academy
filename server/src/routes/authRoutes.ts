import { Router } from "express";
import { userDataValidation } from "../middlewares/userDataValidation";
import { logIn, logOut, signUp, sendVerifyOTP, verifyEmail, sendResetPasswordOTP, resetPassword } from "../controllers/authController";
import { userAuth } from "../middlewares/userAuth";

const authRouter = Router();


authRouter.post('/auth/signup',userDataValidation, signUp);
authRouter.post('/auth/login',userAuth, logIn);
authRouter.post('/auth/logout', logOut);
authRouter.post('/auth/verify-otp', userAuth, sendVerifyOTP);
authRouter.post('/auth/verify-email', userAuth, verifyEmail);
authRouter.post('/auth/send-reset-otp', sendResetPasswordOTP);
authRouter.post('/auth/reset-password', resetPassword);

export {authRouter}