import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAge, calculateEndDate} from "../common/helperFunctions";
import { Request, Response } from "express";
import { membershipStatus, PrismaClient } from "@prisma/client";
import transporter from "../config/nodeMailer";
import { checkValidLocation, getLocationById } from "../repository/locationRepo";
import { addNewUser, checkExistingUser, getUserByEmail, updatePassword, updateResetOtp } from "../repository/userRepo";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse, successResponse } from "../common/apiResponse";
import { checkValidCoachingPlan, getCoachingPlanById } from "../repository/coachingPlanRepo";
import { getLocation } from "./coachController";

const prisma = new PrismaClient();
// let bcrypt:any;

//@dev: Add a new user to database.
export async function signUp(req: Request, res: Response): Promise<void> {
    console.log("------SignUp Route------");
    let {
        fullName,
        email, 
        phone,
        gender, 
        dob, 
        locationId, 
        coachingPlanId,
        planStartDate,
        password,
        role,   
    } = req.body;

    console.log("Received request body:", req.body);
    
    try {
        //@dev: Check for existing users.
        let existingUser = await checkExistingUser(email);
        if(existingUser){
            res.status(409).json(errorResponse(ERROR_MESSAGES.USER_ALREADY_EXISTS));
            return;
        }

        //@dev: Check for valid locations.
        let validLocation = await checkValidLocation(locationId);
        if (!validLocation) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return;
        }

        //@dev: Check for valid coaching plan.
        let validCoachingPlan = await checkValidCoachingPlan(coachingPlanId);
        if(!validCoachingPlan){
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_COACHING_PLAN_ID));
            return;
        }

        //@dev Check user is kid or adult.
        let isKid = checkAge(dob);

        let planEndDate = await calculateEndDate(planStartDate, coachingPlanId);

        //@dev Hash password.
        let hashedPassword = await bcrypt.hash(password, 10);

        //@dev Store new user in DB.
        let newUser = await addNewUser
        (
            fullName,
            email, 
            phone,
            gender, 
            dob, 
            locationId, 
            coachingPlanId,
            hashedPassword,
            planStartDate,
            planEndDate,
            role,
            isKid
        )

        res.status(201).json(successResponse(SUCCESS_MESSAGES.USER_CREATED, newUser));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Login user.
export async function logIn(req: Request, res: Response): Promise<void> {
    console.log("------LogIn Route------");
    let {email, password} = req.body;
    console.log('received body in Login:', req.body);

    if(!email || !password){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return
    }

    try {
        //@dev: Check existing user.
        let user = await getUserByEmail(email);
        if(!user){
            res.status(404).json({success: "false", message: ERROR_MESSAGES.USER_NOT_FOUND});
            return
        }

        //@dev: Get coaching plan name.
        let coachingPlan = await getCoachingPlanById(user.coachingPlanId);

        //@dev: Get Location name.
        let locationName = await getLocationById(user.locationId);

        //@dev Compare Password, and generate JWT token, and send it in cookies.
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
               res.status(400).json({success: "false", message: ERROR_MESSAGES.INCORRECT_PASSWORD, details: isMatch}); 
               return;
            }

            const token = jwt.sign({ userName: user.fullName, id: user.userId, role: user.role}, process.env.JWT_SECRET as string, {expiresIn: '7d'});
            const data = {
                userId: user.userId,
                fullName: user.fullName,
                role: user.role, 
                gender: user.gender, 
                planStartDate: user.planStartDate, 
                planEndDate: user.planEndDate, 
                coachingPlanName: coachingPlan?.name,
                coachingPlanId: user.coachingPlanId,
                planDuration: coachingPlan?.planDuration, 
                locationName: locationName?.name,
                locationId: user.locationId,
                membershipStatus: user.membershipStatus
            };
        
            res.status(200).cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json(successResponse(SUCCESS_MESSAGES.USER_LOGIN, data));
            return;
        }
    } catch (error) {
        res.json(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return
    }
}

//@dev: Logout user.
export async function logOut(req: Request, res: Response): Promise<void> {
    console.log("------LogOut Route------");
    //@dev Clear the clients cookies.
    try {
        res.status(200).clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json(successResponse(SUCCESS_MESSAGES.USER_LOGOUT));
        return;
    } catch (error) {
        res.json(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return; 
    }
}


///-------------------Have to refactor the auth fields-------------------------
//Verify email routes:
export async function sendVerifyOTP(req: Request, res: Response): Promise<void> {
    console.log("------Send Verify OTP Route------");
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_USER));
        return;
    }

    try{
        //Check if the user exists.
        const user = await prisma.user.findUnique({
            where:{
                userId: userId
            }
        });
        
        if(!user){
            res.status(404).json(errorResponse(ERROR_MESSAGES.USER_NOT_FOUND));
            return;
        }
    
        if(user.isVerified){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.ACCOUNT_ALREADY_VERIFIED));
            return;
        }

        //Generate OTP and OTP expiry and update in DB.
        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        await prisma.user.update({
            where:{
                userId: userId,
            },
            data:{
                otpVerificationCode: OTP,
                otpVerificationExpiry: otpExpiry,
            }
        });

        //Mail the generated OTP to user.
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: 
            `Hi ${user.fullName}👋, 
             Your account verification OTP is: ${OTP}.
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json(successResponse(SUCCESS_MESSAGES.VERIFICATION_EMAIL_SEND));
        return;
    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export async function verifyEmail(req: Request, res: Response): Promise<void> {
    console.log("-----Verify Email Route------");
    const {userId, OTP} = req.body;

    if(!userId || !OTP){
        res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where:{
                userId: userId,
            }
        });

        if(!user){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.USER_NOT_FOUND));
            return;
        }

        if(user.otpVerificationCode === '' || user.otpVerificationCode !== OTP){
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_OTP));
            return;
        }

        if(user.otpVerificationExpiry.getTime() < Date.now()){
            res.status(410).json(errorResponse(ERROR_MESSAGES.OTP_EXPIRED));
            return;
        }

        const date = new Date (Date.now());
        await prisma.user.update({
            where:{
                userId: userId,
            },
            data:{
                isVerified: true,
                otpVerificationCode: '',
                otpVerificationExpiry: date,
            }
        });

        res.status(200).json(successResponse(SUCCESS_MESSAGES.EMAIL_VERIFIED));
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//------------------------Reset password routes-----------------------------
export async function sendResetPasswordOTP(req: Request, res: Response): Promise<void> {
    console.log("------Send Reset Password OTP Route------");
    try{
        const { email } = req.body;
        if (!email) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        //@dev: Check if the user exists.
        const user = await checkExistingUser({email: email});
        if(!user){
            res.status(400).json(successResponse(ERROR_MESSAGES.EMAIL_NOT_FOUND));
            return;
        }

        //@dev: Generate OTP and Expiry and store it in DB.
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        
        let updateOtp = await updateResetOtp({email: email, otp: otp, otpExpiry: otpExpiry});
        if(!updateOtp){
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }

        //@dev: Send Reset OTP over the mail.
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Reset Password OTP',
            text: 
            `Hi ${user.fullName}, 
             Your password reset OTP is: ${otp}
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json(successResponse(SUCCESS_MESSAGES.RESET_PASSWORD_EMAIL_SEND));
        return;
    }catch(error){
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    console.log("------Reset Password Route------");
    console.log(" The Request Body Received is:", req.body);
    const {email, otp, password} = req.body;

    if(!email || !otp || !password){
        res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
        return;
    }

    try {
        //@dev: Check if the user exists.
        const user = await checkExistingUser({email: email});
        if(!user){
            res.status(400).json(successResponse(ERROR_MESSAGES.EMAIL_NOT_FOUND));
            return;
        }
        
        
        //@dev: Check if the OTP is valid and not expired.
        if(user.otpResetCode === "" || user.otpResetCode !== otp){
            res.status(401).json(errorResponse(ERROR_MESSAGES.INVALID_OTP));
            return;
        }
        
        if(user.otpResetExpiry.getTime() < Date.now()){
            res.status(401).json(errorResponse(ERROR_MESSAGES.OTP_EXPIRED));
            return;
        }
        
        //@dev: Reset the password and store it in DB.
        const date = new Date (Date.now());
        const newPassword = await bcrypt.hash(password, 10);
        let updatedDetails = await updatePassword({email: email, otpResetExpiry: date, newPassword: newPassword});
        if(!updatedDetails){
            res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
            return;
        }

        res.status(200).json(successResponse(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS));
        return; 
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}