import { Router } from "express";
import { coachAuth } from "../middlewares/coachAuth";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames} from "../controllers/coachController";

const coachRouter = Router();

//@dev: Location Routes:
coachRouter.post('/add-location',coachAuth, locationDataValidation, addLocation);
coachRouter.get('/location', getLocation);

//@dev: Coaching Plan Routes:
coachRouter.post('/add-coaching-plan' ,coachAuth, coachingPlanDataValidation, addCoachingPlan);
coachRouter.get('/coaching-plan', getCoachingPlan);
coachRouter.get('/coaching-plan-ids', getCoachingPlanNames);

//@dev: Coaching Schedule Routes:
coachRouter.post('/add-coaching-schedule',coachAuth , coachingScheduleDataValidation, addCoachingSchedule);
coachRouter.get('/coaching-schedule', getCoachingSchedule);

//@dev: Attendence Related Routes:
// coachRouter.get('attendence',getAttendence);

export {coachRouter}