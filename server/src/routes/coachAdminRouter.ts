import { Router } from "express";
import { addLocation, addCoachingPlan, addCoachingSchedule, getLocation, getCoachingPlan, getCoachingSchedule, getCoachingPlanNames, getAttendence } from "../controllers/coachAdminController";
import { coachingPlanDataValidation, coachingScheduleDataValidation, locationDataValidation } from "../middlewares/coachingDataValidation";

const coachAdminRouter = Router();

//Location Routes:
coachAdminRouter.post('/add-location',locationDataValidation, addLocation); //done
coachAdminRouter.get('/location', getLocation);//done

//Coaching Plan Routes:
coachAdminRouter.post('/add-coaching-plan', coachingPlanDataValidation, addCoachingPlan);//done
coachAdminRouter.get('/coaching-plan', getCoachingPlan);//done
coachAdminRouter.get('/coaching-plan-ids', getCoachingPlanNames);//done

//Coaching Schedule Routes:
coachAdminRouter.post('/add-coaching-schedule', coachingScheduleDataValidation, addCoachingSchedule);//done
coachAdminRouter.get('/coaching-schedule', getCoachingSchedule);//done

// Attendence Related Routes:
coachAdminRouter.get('attendence',getAttendence);//done


export {coachAdminRouter}