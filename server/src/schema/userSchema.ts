import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  password: Joi.string().min(4).max(20).required(),
  role: Joi.string().required(),
  joinDate: Joi.date(),
  locationId: Joi.number(),
  coachingPlanId: Joi.number(),
  planEndDate: Joi.date(),
  planStartDate: Joi.date(),
});

// Data-Type frat for the incoming Data.
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