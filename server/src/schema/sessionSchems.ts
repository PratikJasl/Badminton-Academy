import Joi from "joi";

//Schema for validating Coaching Plans.
export const coachingPlanSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  description: Joi.string().min(5).max(100).required(),
  planDuration: Joi.string().min(1).max(60).required(),
  price: Joi.number().min(1).required(),
});

//Schema for validating Coaching Locations.
export const locationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  address: Joi.string().min(5).max(50).required()
});

//Schema for validating Coaching Schedule.
export const coachingScheduleSchema = Joi.object({
    coachingDays: Joi.array().required(),
    coachingTime: Joi.string().min(3).max(10).required(),
    coachingDuration: Joi.string().min(1).max(10).required()
});