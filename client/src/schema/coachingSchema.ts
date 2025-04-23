import * as yup from "yup"

export const locationSchema = yup.object({
    name: yup
        .string()
        .min(3)
        .max(20)
        .required("Location name is required"),
    address: yup
        .string()
        .min(5)
        .max(50)
        .required("address is required")
})

export const scheduleSchema = yup.object({
    coachingBatch: yup
            .string()
            .oneOf(['Adults_Standard', 'Adults_Premium', 'Kids_Standard', 'Kids_Premium'])
            .required("coaching Batch is required"),
    coachingDays: yup
            .string()
            .required("coaching Days are required"),
    startTime: yup
            .string()
            .required("Start time is required"),
    endTime: yup
            .string()
            .required("End time is required"),
    locationId: yup
            .number()
            .transform((value, originalValue) => {
                return originalValue === "" ? null : value;
            })
            .required("Location is required")
})