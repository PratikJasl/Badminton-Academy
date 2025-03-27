import Joi from "joi";

// Schema for validating Coaching Locations.
const locationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().trim(),
  address: Joi.string().min(5).max(50).required().trim(),
});

// Schema for validating Coaching Plans.
const planSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().trim(),
  description: Joi.string().min(5).max(100).required().trim(),
  planDuration: Joi.string().min(1).max(60).required().trim(),
  price: Joi.number().min(1).required(),
});

// Schema for validating Coaching Schedule.
const scheduleSchema = Joi.object({
  coachingBatch: Joi.string().required().trim(),
  coachingDays: Joi.array().required(),
  coachingTime: Joi.string().min(3).max(10).required().trim(),
  coachingDuration: Joi.string().min(1).max(10).required().trim(),
  locationId: Joi.number().required(),
});

// Export all schemas under the name 'coachingSchema'
export const coachingSchema = {
  location: locationSchema,
  plan: planSchema,
  schedule: scheduleSchema,
};