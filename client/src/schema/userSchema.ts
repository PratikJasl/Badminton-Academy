import Joi from "joi";

export const userSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required().messages({'string.empty': 'Full Name is required',}),
    dob: Joi.date().required().max('now').messages({'date.base': 'Date of Birth is required', 'date.max': 'Date of Birth must be in the past',}),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({'any.required': 'Gender is required',}),
    email: Joi.string().email({ tlds: { allow: true } }).required().messages({'string.email': 'Invalid email format', 'any.required': 'Email is required',}),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({'string.length': 'Phone number must be 10 digits', 'string.pattern.base': 'Phone number must contain only digits', 'any.required': 'Phone number is required',}),
    password: Joi.string().min(4).max(20).required().messages({'string.min': 'Password must be at least 6 characters', 'string.max': 'Password must be within 20 characters', 'any.required': 'Password is required',}),
    role: Joi.string().valid('student', 'coach', 'admin').required().messages({'any.required': 'Role is required',}),
    locationId: Joi.number().required().messages({'any.required': 'Location is required',}),
    coachingPlanId: Joi.number().required().messages({'any.required': 'Coaching Plan is required',}),
    joinDate: Joi.date().required().messages({'date.base': 'Join Date is required',}),
    planStartDate: Joi.date().required().messages({'date.base': 'Plan Start Date is required',}),
    planEndDate: Joi.date().required().messages({'date.base': 'Plan End Date is required',}),
});

export type SignUpFromData = {
    fullName: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    locationId: number;
    coachingPlanId: number;
    joinDate: string;
    planStartDate: string;
    planEndDate: string;
}