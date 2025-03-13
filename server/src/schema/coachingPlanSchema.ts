import Joi from "joi";

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