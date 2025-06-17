import { Router } from "express";
import { coachAuth } from "../middlewares/coachAuth";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames, deleteLocation, deleteSchedule, getAttendance, updateAttendance, addUserPlan} from "../controllers/coachController";

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
coachRouter.post('/attendance',coachAuth ,getAttendance);

//@raj_comment: attendance correction for some user will be handled from clien-side.
//@raj_comment: By passing the objects have change in the "isStatus" value.
//@raj_query: Or we can think about a seperate route for single user attendance correction.
coachRouter.put('/updateAttendance',coachAuth,updateAttendance);
coachRouter.post('/add-user-plan',addUserPlan);


export {coachRouter}