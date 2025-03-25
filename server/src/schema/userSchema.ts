import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  dob: Joi.date().required(),
  locationId: Joi.number().required(),
  coachingPlanId: Joi.number().required(),
  password: Joi.string().min(4).max(20).required(),
  role: Joi.string().valid('student', 'coach', 'admin').required(),
  gender: Joi.string().valid('male', 'female', 'other'),
  joinDate: Joi.date(),
  planEndDate: Joi.date(),
  planStartDate: Joi.date(),
}); 
