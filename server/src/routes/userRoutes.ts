import { getUserDetail } from "../controllers/userController";
import { Router } from "express";

const userRouter = Router();

userRouter.get('/data', getUserDetail);

export{userRouter}