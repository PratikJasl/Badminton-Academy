import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule } from "../controllers/sessionController";
import { validateCoachingPlanData, validateCoachingScheduleData, validateLocationData } from "../middlewares/validateSessionData";

const sessionRouter = Router();

sessionRouter.post('/session/add-location',validateLocationData, addLocation);

sessionRouter.post('/session/add-coaching-plan', validateCoachingPlanData, addCoachingPlan);

sessionRouter.post('/session/add-coaching-schedule', validateCoachingScheduleData, addCoachingSchedule);

export {sessionRouter}