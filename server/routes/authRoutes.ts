import { Router } from "express";

const authRouter = Router();

authRouter.post('/auth/signUp');

authRouter.post('/auth/login');

authRouter.post('/auth/logout');