import { getUserDetail } from "../controllers/userController";
import { Router } from "express";
import { coachAuth } from "../middlewares/coachAuth";

const userRouter = Router();

userRouter.get('/data', getUserDetail);

export{userRouter}