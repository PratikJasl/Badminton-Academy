import { Router } from "express";
import { coachAuth } from "../middlewares/coachAuth";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames, deleteLocation, deleteSchedule} from "../controllers/coachController";

const coachRouter = Router();

//@dev: Location Routes:
coachRouter.post('/add-location',coachAuth, locationDataValidation, addLocation);
coachRouter.post('/delete-location',coachAuth, deleteLocation);
coachRouter.get('/location', getLocation);

//@dev: Coaching Plan Routes:
coachRouter.post('/add-coaching-plan' ,coachAuth, coachingPlanDataValidation, addCoachingPlan);
coachRouter.get('/coaching-plan', getCoachingPlan);
coachRouter.get('/coaching-plan-ids', getCoachingPlanNames);

//@dev: Coaching Schedule Routes:
coachRouter.post('/add-coaching-schedule',coachAuth , coachingScheduleDataValidation, addCoachingSchedule);
coachRouter.post('/delete-coaching-schedule', coachAuth, deleteSchedule);
coachRouter.get('/coaching-schedule', getCoachingSchedule);

//@dev: Attendence Related Routes:
// coachRouter.get('attendence',getAttendence);

export {coachRouter}