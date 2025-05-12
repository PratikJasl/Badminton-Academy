import { getUserDetailById, updateUserDetail } from "../controllers/userController";
import { Router } from "express";
import { coachAuth } from "../middlewares/coachAuth";
import { userAuth } from "../middlewares/userAuth";

const userRouter = Router();

userRouter.get('/data',userAuth, getUserDetailById);
userRouter.put('/update', updateUserDetail);

export{userRouter}