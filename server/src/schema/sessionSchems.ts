import Joi from "joi";

//Schema for validating Coaching Plans.
export const coachingPlanSchema = Joi.object({
  name: Joi.string().min(5).max(20).required(),
  description: Joi.string().min(5).max(100).required(),
  planDuration: Joi.string().min(1).max(60).required(),
  price: Joi.number().min(1).required(),
});

export interface coachingPlanSchema {
    name: string,   
    description: string,
    planDuration: string,
    price: number
}


//Schema for validating Coaching Locations.
export const locationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  address: Joi.string().min(5).max(50).required()
});

export interface locationSchema {
    name: string,
    address: string,
    
}