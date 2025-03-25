import * as yup from "yup"

export const userSchema = yup.object({
    fullName: yup.string()
        .min(3, 'Full Name must be at least 3 characters')
        .max(50, 'Full Name must be at most 50 characters')
        .required('Full Name is required'),
    dob: yup.date()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth must be in the past'),
    gender: yup.string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Gender is required'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    phone: yup.string()
        .length(10, 'Phone number must be 10 digits')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
    password: yup.string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    role: yup.string()
        .oneOf(['student', 'coach', 'admin'], 'Invalid Role')
        .required('Role is required'),
    locationId: yup.number()
        .required('Location is required'),
    coachingPlanId: yup.number()
        .required('Coaching Plan is required'),
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
}