import { Router } from "express";
import { addLocation } from "../controllers/sessionController";
import { validateLocationData } from "../middlewares/validateLocationData";

const sessionRouter = Router();

sessionRouter.post('/session/add-location',validateLocationData, addLocation);

export {sessionRouter}