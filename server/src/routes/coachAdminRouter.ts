import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanIds } from "../controllers/coachAdminController";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";

const coachAdminRouter = Router();

//Location Routes:
coachAdminRouter.post('/add-location',locationDataValidation, addLocation);
coachAdminRouter.get('/location', getLocation);

//Coaching Plan Routes:
coachAdminRouter.post('/add-coaching-plan', coachingPlanDataValidation, addCoachingPlan);
coachAdminRouter.get('/coaching-plan', getCoachingPlan);
coachAdminRouter.get('/coaching-plan-ids', getCoachingPlanIds)

//Coaching Schedule Routes:
coachAdminRouter.post('/add-coaching-schedule', coachingScheduleDataValidation, addCoachingSchedule);
coachAdminRouter.get('/coaching-schedule', getCoachingSchedule);

export {coachAdminRouter}