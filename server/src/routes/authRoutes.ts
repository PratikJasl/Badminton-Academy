import { Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import { logIn, logOut, signUp, sendEmailVerificationOTP, verifyEmail, sendResetPasswordOTP, resetPassword } from "../controllers/authController";
import { emailDataValidation, logInDataValidation, signUpDataValidation, verifyEmailDataValidation, resetPasswordDataValidation } from "../middlewares/authRouteDataValidation";

const authRouter = Router();

//@dev: Authentication routes
authRouter.post('/auth/signup', signUpDataValidation, signUp);
authRouter.post('/auth/login', logInDataValidation, logIn);
authRouter.post('/auth/logout', userAuth, logOut);
authRouter.post('/auth/verify-otp', emailDataValidation, sendEmailVerificationOTP);
authRouter.post('/auth/verify-email', verifyEmailDataValidation, verifyEmail);
authRouter.post('/auth/send-reset-otp', emailDataValidation, sendResetPasswordOTP);
authRouter.post('/auth/reset-password', resetPasswordDataValidation, resetPassword);

export { authRouter };