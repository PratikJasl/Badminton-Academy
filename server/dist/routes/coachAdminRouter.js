"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coachAdminRouter = void 0;
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const validateSessionData_1 = require("../middlewares/validateSessionData");
const coachAdminRouter = (0, express_1.Router)();
exports.coachAdminRouter = coachAdminRouter;
//Location Routes:
coachAdminRouter.post('/session/add-location', validateSessionData_1.validateLocationData, sessionController_1.addLocation);
coachAdminRouter.get('/session/location', sessionController_1.getLocation);
//Coaching Plan Routes:
coachAdminRouter.post('/session/add-coaching-plan', validateSessionData_1.validateCoachingPlanData, sessionController_1.addCoachingPlan);
coachAdminRouter.get('/session/coaching-plan', sessionController_1.getCoachingPlan);
//Coaching Schedule Routes:
coachAdminRouter.post('/session/add-coaching-schedule', validateSessionData_1.validateCoachingScheduleData, sessionController_1.addCoachingSchedule);
coachAdminRouter.get('/session/coaching-schedule', sessionController_1.getCoachingSchedule);
