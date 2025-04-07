import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames, getAttendence } from "../controllers/coachAdminController";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";
import { userAuth } from "../middlewares/userAuth";

const coachAdminRouter = Router();

//Location Routes:
coachAdminRouter.post('/add-location',userAuth ,locationDataValidation, addLocation);
coachAdminRouter.get('/location', getLocation);

//Coaching Plan Routes:
coachAdminRouter.post('/add-coaching-plan',userAuth, coachingPlanDataValidation, addCoachingPlan);
coachAdminRouter.get('/coaching-plan', getCoachingPlan);
coachAdminRouter.get('/coaching-plan-ids', getCoachingPlanNames);

//Coaching Schedule Routes:
coachAdminRouter.post('/add-coaching-schedule',userAuth, coachingScheduleDataValidation, addCoachingSchedule);
coachAdminRouter.get('/coaching-schedule', getCoachingSchedule);

// Attendence Related Routes:
coachAdminRouter.get('attendence',getAttendence);


export {coachAdminRouter}