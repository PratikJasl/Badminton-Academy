import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const locationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  address: Joi.string().min(5).max(50).required()
});

// Data-Type frat for the incoming Data.
export interface locationSchema {
    name: string,
    address: string,
    
}