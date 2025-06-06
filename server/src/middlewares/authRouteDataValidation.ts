import { Request, Response, NextFunction } from "express";
import { logInSchema, signUpSchema, emailSchema, verifyEmailSchema, resetPasswordSchema } from "../schema/userSchema";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/apiResponse";

//@dev: Middleware to validate signup user data.
export async function signUpDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------SignUp Data Validation Middleware------")
    const {
        fullName,
        email,
        phone,
        dob,
        locationId,
        password,
        role,
    } = req.body;
    //console.log(req.body); 
    
    try {
        if(!fullName || !dob  || !email || !phone || !password || !role || !locationId){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return
        }
        const {error, value} = await signUpSchema.validateAsync(req.body);
        if(error){
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}

//@dev: Middleware to validate Login user data.
export async function logInDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------Login Data Validation Middleware------")
    const {
        email,
        password,
    } = req.body;
    
    try {
        if(!email || !password){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
        const {error, value} = await logInSchema.validateAsync(req.body);
        if(error){
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}

//@dev: Middleware to validate user email.
export async function emailDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------Email Data Validation Middleware------");
    const { email } = req.body;

    try {
        if (!email) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        const { error, value } = await emailSchema.validateAsync(req.body);
        if (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}

//@dev: Middleware to validate verify email route data.
export async function verifyEmailDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------Verify Email Validation Middleware------");
    const { email , otp} = req.body;

    try {
        if(!email || !otp){
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        const { error, value } = await verifyEmailSchema.validateAsync(req.body);
        if (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}

export async function resetPasswordDataValidation(req: Request, res: Response, next: NextFunction): Promise<void>{
    console.log("------Reset Password Validation Middleware------");
    const { email, otp, password } = req.body;

    try {
        if (!email || !otp || !password) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        const { error, value } = await resetPasswordSchema.validateAsync(req.body);
        if (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}