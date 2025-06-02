import { Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import { userDataValidation } from "../middlewares/userDataValidation";
import { logIn, logOut, signUp, sendVerifyOTP, verifyEmail, sendResetPasswordOTP, resetPassword } from "../controllers/authController";


const authRouter = Router();

//@dev Authentication routes.
authRouter.post('/auth/signup',userDataValidation, signUp);
authRouter.post('/auth/login', logIn);
authRouter.post('/auth/logout',userAuth, logOut);
authRouter.post('/auth/verify-otp', userAuth, sendVerifyOTP);
authRouter.post('/auth/verify-email', userAuth, verifyEmail);
authRouter.post('/auth/send-reset-otp', sendResetPasswordOTP);
authRouter.post('/auth/reset-password', resetPassword);

export {authRouter}