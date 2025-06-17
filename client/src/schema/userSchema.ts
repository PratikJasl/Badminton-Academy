import * as yup from "yup"

const today = new Date();

export const oneYearAgo = new Date(today);
oneYearAgo.setFullYear(today.getFullYear() - 1);
oneYearAgo.setHours(0, 0, 0, 0);

export const oneYearFuture = new Date(today);
oneYearFuture.setFullYear(today.getFullYear() + 1);
oneYearFuture.setHours(23, 59, 59, 999)

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
    // coachingPlanId: yup
    //     .number()
    //     .transform((value, originalValue) => {
    //         return originalValue === "" ? null : value;
    //     })
    //     .nullable()
    //     .required('Coaching Plan is required'),
    // planStartDate: yup
    //     .date()
    //     .transform((value, originalValue) => {
    //         if (typeof originalValue === 'string' && originalValue === "") {
    //             return null;
    //         }
    //         if (typeof originalValue === 'string') {
    //              const [year, month, day] = originalValue.split('-').map(Number);
    //              return new Date(Date.UTC(year, month - 1, day));
    //         }
    //         return value;
    //     })
    //     .nullable()
    //     .required('Plan start date is required')
    //     .min(oneYearAgo, `Plan start date cannot be more than one year in the past`)
    //     .max(oneYearFuture, `Plan start date cannot be more than one year in the future`),
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'), 
    role: yup
        .string()
        .oneOf(['student', 'admin', 'coach'])
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

export const emailVerificationSchema = yup.object({
    email: yup 
        .string()
        .email('Invalid email format')
        .required('Email is required'),
})

export const resetPasswordVerificationSchema = yup.object({
    password: yup
        .string()
        .min(4, 'Password must be at least 4 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'), 
    otp: yup
        .string()
        .length(6, 'OTP must be 6 digits')
        .matches(/^[0-9]+$/, 'OTP must contain only digits')
        .required('OTP is required')
})

export const EmailVerificationSchema = yup.object({
    otp: yup
        .string()
        .length(6, 'OTP must be 6 digits')
        .matches(/^[0-9]+$/, 'OTP must contain only digits')
        .required('OTP is required')
})

// export const emailVerificationSchema = yup.object({
//     email: yup
//         .string()
//         .email('Invalid email format')
//         .required('Email is required'),
//     otp: yup
//         .string()
//         .length(6, 'OTP must be 6 digits')
//         .matches(/^[0-9]+$/, 'OTP must contain only digits')
//         .required('OTP is required')
// })

export const scheduleSchema = yup.object({
    batch: yup
        .string()
        .oneOf(["Kids_Standarg", "Kids_Premium", "Adults_Standard", "Adults_Premium"])
        .required("Coaching batch is required"),
    days: yup
        .string()
        .required("Coaching Days are required"),
    startTime: yup
        .string()
        .required("Start time is required"),
    endTime: yup
        .string()
        .required("End time is required")
        .test(
            'is-after-start-time',
            'End time must be after start time',
            function (endTimeValue, context) {
                const { startTime } = context.parent;

                if (!startTime || !endTimeValue || typeof startTime !== 'string' || typeof endTimeValue !== 'string') {
                    return true; 
                }

                return endTimeValue > startTime;
            }
        ),
    locationId: yup
        .string()
        .required("Location is required")
})

export const userDetailSchema = yup.object({
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
            if (typeof originalValue === 'string' && originalValue === "") {
                return null;
            }
            if (typeof originalValue === 'string') {
                 const [year, month, day] = originalValue.split('-').map(Number);
                 return new Date(Date.UTC(year, month - 1, day));
            }
            return value;
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
    planStartDate: yup
        .date()
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string' && originalValue === "") {
                return null;
            }
            if (typeof originalValue === 'string') {
                 const [year, month, day] = originalValue.split('-').map(Number);
                 return new Date(Date.UTC(year, month - 1, day));
            }
            return value;
        })
        .nullable()
        .required('Plan start date is required')
        .min(oneYearAgo, `Plan start date cannot be more than one year in the past`)
        .max(oneYearFuture, `Plan start date cannot be more than one year in the future`),
});