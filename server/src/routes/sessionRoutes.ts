import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule } from "../controllers/sessionController";
import { validateCoachingPlanData, validateCoachingScheduleData, validateLocationData } from "../middlewares/validateSessionData";

const sessionRouter = Router();

//Location Routes:
sessionRouter.post('/session/add-location',validateLocationData, addLocation);

sessionRouter.get('/session/location', getLocation);

//Coaching Plan Routes:
sessionRouter.post('/session/add-coaching-plan', validateCoachingPlanData, addCoachingPlan);

sessionRouter.get('/session/coaching-plan', getCoachingPlan);

//Coaching Schedule Routes:
sessionRouter.post('/session/add-coaching-schedule', validateCoachingScheduleData, addCoachingSchedule);

sessionRouter.get('/session/coaching-schedule', getCoachingSchedule);

export {sessionRouter}