import * as yup from "yup"

export const signUpSchema = yup.object({
    fullName: yup
        .string()
        .min(3, 'Full Name must be at least 3 characters')
        .max(50, 'Full Name must be at most 50 characters')
        .required('Full Name is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    phone: yup
        .string()
        .length(10, 'Phone number must be 10 digits')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
    gender: yup
        .string()
        .oneOf(['male', 'female', 'other'])
        .required('Gender is required'),
    dob: yup
        .date()
        .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
        })
        .nullable()
        .required('Date of Birth is required')
        .max(new Date(), 'Date of Birth must be in the past'),
    locationId: yup
        .number()
        .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
        })
        .nullable()
        .required('Location is required'),
    coachingPlanId: yup
        .number()
        .transform((value, originalValue) => {
            return originalValue === "" ? null : value;
        })
        .nullable()
        .required('Coaching Plan is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'), 
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
})