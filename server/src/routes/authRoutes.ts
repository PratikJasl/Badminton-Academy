import { Router } from "express";
import { validateUserData } from "../middlewares/validateUserData";
import { logIn, logOut, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/auth/signup',validateUserData, signUp);

authRouter.post('/auth/login', logIn);

authRouter.post('/auth/logout', logOut);

authRouter.post('/auth/verify-otp');

authRouter.post('/auth/verify-account');

authRouter.post('/auth/send-reset-otp');

authRouter.post('/auth/reset-password');

export {authRouter}