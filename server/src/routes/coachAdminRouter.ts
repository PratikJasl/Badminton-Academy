import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames} from "../controllers/coachAdminController";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";
import { coachAdminAuth } from "../middlewares/coachAdminAuth";

const coachAdminRouter = Router();

//@dev Location Routes:
coachAdminRouter.post('/add-location',coachAdminAuth ,locationDataValidation, addLocation);
coachAdminRouter.get('/location', getLocation);

//@dev Coaching Plan Routes:
coachAdminRouter.post('/add-coaching-plan',coachAdminAuth , coachingPlanDataValidation, addCoachingPlan);
coachAdminRouter.get('/coaching-plan', getCoachingPlan);
coachAdminRouter.get('/coaching-plan-ids', getCoachingPlanNames);

//@dev Coaching Schedule Routes:
coachAdminRouter.post('/add-coaching-schedule',coachAdminAuth , coachingScheduleDataValidation, addCoachingSchedule);
coachAdminRouter.get('/coaching-schedule', getCoachingSchedule);

//@dev Attendence Related Routes:
// coachAdminRouter.get('attendence',getAttendence);

export {coachAdminRouter}