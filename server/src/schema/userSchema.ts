import Joi from "joi";

//@dev: JOI schema for validating the incoming signup JSON data.
export const signUpSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  dob: Joi.date().required(),
  locationId: Joi.number().required(),
  password: Joi.string().min(4).max(20).required(),
  role: Joi.string().valid('student', 'coach', 'admin').required(),
  gender: Joi.string().valid('male', 'female', 'other'),
  joinDate: Joi.date(),
});

//@dev: JOI schema for validating the incoming login JSON data.
export const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
})

//@dev: JOI schema for validating the incoming email JSON data.
export const emailSchema = Joi.object({
  email: Joi.string().email().required()
})

//@dev: JOI schema for validating the incoming email and otp JSON data.
export const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
  password: Joi.string().min(4).max(20).required()
});
