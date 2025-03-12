import { Router } from "express";

const authRouter = Router();

authRouter.post('/auth/signUp');

authRouter.post('/auth/login');

authRouter.post('/auth/logout');

authRouter.post('/auth/verify-otp');

authRouter.post('/auth/verify-account');

authRouter.post('/auth/send-reset-otp');

authRouter.post('/auth/reset-password');

export {authRouter}