"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coachAdminRouter = void 0;
const express_1 = require("express");
const coachAdminController_1 = require("../controllers/coachAdminController");
const coachingDataValidation_1 = require("../middlewares/coachingDataValidation");
const coachAdminRouter = (0, express_1.Router)();
exports.coachAdminRouter = coachAdminRouter;
//Location Routes:
coachAdminRouter.post('/add-location', coachingDataValidation_1.locationDataValidation, coachAdminController_1.addLocation);
coachAdminRouter.get('/location', coachAdminController_1.getLocation);
//Coaching Plan Routes:
coachAdminRouter.post('/add-coaching-plan', coachingDataValidation_1.coachingPlanDataValidation, coachAdminController_1.addCoachingPlan);
coachAdminRouter.get('/coaching-plan', coachAdminController_1.getCoachingPlan);
coachAdminRouter.get('/coaching-plan-ids', coachAdminController_1.getCoachingPlanIds);
//Coaching Schedule Routes:
coachAdminRouter.post('/add-coaching-schedule', coachingDataValidation_1.coachingScheduleDataValidation, coachAdminController_1.addCoachingSchedule);
coachAdminRouter.get('/coaching-schedule', coachAdminController_1.getCoachingSchedule);
