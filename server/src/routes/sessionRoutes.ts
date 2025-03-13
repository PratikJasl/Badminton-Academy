import { Router } from "express";
import { addLocation, addCoachingPlan } from "../controllers/sessionController";
import { validateCoachingPlanData, validateLocationData } from "../middlewares/validateSessionData";

const sessionRouter = Router();

sessionRouter.post('/session/add-location',validateLocationData, addLocation);

sessionRouter.post('/session/add-coaching-plan', validateCoachingPlanData, addCoachingPlan);

export {sessionRouter}