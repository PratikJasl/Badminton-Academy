import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  password: Joi.string().min(4).max(20).required(),
  role: Joi.string().valid('student', 'coach', 'admin').required(),
  joinDate: Joi.date().required(),
  locationId: Joi.number().required(),
  coachingPlanId: Joi.number().required(),
  planEndDate: Joi.date().required(),
  planStartDate: Joi.date().required(),
});

// Data-Type format for the incoming Data.
export interface userData {
    fullName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    password: string,
    role: string,
    joinDate: Date,
    primaryLocation: string,
    coachingPlan: string,
}