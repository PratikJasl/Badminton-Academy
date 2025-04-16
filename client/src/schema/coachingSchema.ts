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