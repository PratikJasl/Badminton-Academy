import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { addNewUser } from "../repository/userRepo";
import { errorResponse, successResponse } from "../common/apiResponse";


const prisma = new PrismaClient();

//User On-boarding routes
export async function signUp(req: Request, res: Response) {
    let {
        fullName,
        email, 
        phone,
        gender, 
        dob, 
        locationId, 
        coachingPlanId,
        password, 
        role,   
    } = req.body;

    console.log("request body:", req.body);
    
    try {
        //Check for existing Users
        let existingUser = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })
        if(existingUser){
            res.status(400).json(errorResponse(ERROR_MESSAGES.USER_ALREADY_EXISTS));
            return;
        }

        //Check for valid location
        let location = await prisma.location.findUnique({
            where: {locationId: locationId}
        })

        if (!location) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_LOCATION_ID));
            return
        }

        //Check for valid Coaching Plan
        let coachingPlan = await prisma.coachingPlan.findUnique({
            where: {coachingPlanId: coachingPlanId}
        })

        if( !coachingPlan){
            res.status(400).json(errorResponse(ERROR_MESSAGES.INVALID_COACHING_PLAN_ID));
            return
        }

        //Hash Password and store the user data
        let hashedPassword = await bcrypt.hash(password, 10);
        // console.log("Hashed Password", hashedPassword);

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
            role
        )

        //Generate JWT token and send it in response cookies.
        let token = jwt.sign({ id: newUser.userId }, process.env.JWT_SECRET as string, {expiresIn: '7d'});
        console.log("Token", token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //Send Acknowledgment Mail and Response
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome!! Thanks for Signing Up',
            text: 
            `Hi ${fullName}👋, 
             We're thrilled to have you on board. Your account has been created with email id 📧: ${email}.

             Best Regards
             Pratik Jussal`
        }
        await transporter.sendMail(mailOptions);

        res.status(201).json(successResponse(SUCCESS_MESSAGES.USER_CREATED,newUser));
        return;
        
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export async function logIn(req: Request, res: Response) {
    let {email, password} = req.body;
    console.log('received body in Login:', req.body);

    if(!email || !password){
        res.status(400).json({success: "false", message: ERROR_MESSAGES.MISSING_FIELD});
        return
    }

    try {
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.USER_NOT_FOUND});
            return
        }
        console.log("user info:", user);
        //Compare Password, and generate JWT token, and send it in cookies.
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
               res.status(400).json({success: "false", message: ERROR_MESSAGES.INCORRECT_PASSWORD, details: isMatch}); 
               return;
            }

            const token = jwt.sign({ id: user.userId}, process.env.JWT_SECRET as string, {expiresIn: '7d'});
            const data = {fullName: user.fullName, role: user.role, gender: user.gender};
            console.log("Data to send:", data);

            res.status(200).cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json(successResponse(SUCCESS_MESSAGES.USER_LOGIN,data));
            return;
        }
    } catch (error) {
        res.json(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return
    }
}

export async function logOut(req: Request, res: Response) {
    //Clear the clients cookies.
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

//Verify email routes:
export async function sendVerifyOTP(req: Request, res: Response){
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

export async function verifyEmail(req: Request, res: Response){
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

//Reset password routes:
export async function sendResetPasswordOTP(req: Request, res: Response){
    try{
        const { email } = req.body;

        if (!email) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        //Check if the user exists.
        const user = await prisma.user.findUnique({
            where:{
                email: email,
            }
        });
        
        if(!user){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.USER_NOT_FOUND));
            return;
        }

        //Generate OTP and Expiry and store it in DB.
        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        
        await prisma.user.update({
            where:{
                email: email,
            },
            data:{
                otpResetCode: OTP,
                otpResetExpiry: otpExpiry,
            }
        });
        
        //Send Reset OTP over the mail.
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password OTP',
            text: 
            `Hi ${user.fullName}👋, 
             Your password reset OTP is: ${OTP}.
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json(successResponse(SUCCESS_MESSAGES.RESET_PASSWORD_EMAIL_SEND));
        return;
    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export async function resetPassword(req: Request, res: Response){
    const {email, OTP, password} = req.body;

    if(!email || !OTP || !password){
        res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
        return;
    }

    try {
        //Check if user exists.
        let user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
    
        if(!user){
            res.status(204).json(successResponse(SUCCESS_MESSAGES.USER_NOT_FOUND));
            return;
        }
        
        //Check if the OTP is valid and not expired.
        if(user.otpResetCode === "" || user.otpResetCode !== OTP){
            res.status(401).json(errorResponse(ERROR_MESSAGES.INVALID_OTP));
            return;
        }

        if(user.otpResetExpiry.getTime() < Date.now()){
            res.status(401).json(errorResponse(ERROR_MESSAGES.OTP_EXPIRED));
            return;
        }
        
        //Reset the password and store it in DB.
        const date = new Date (Date.now());
        const newPassword = await bcrypt.hash(password, 10);
    
        await prisma.user.update({
            where:{
                email: email,
            },
            data:{
                otpResetCode: "",
                otpResetExpiry: date,
                password: newPassword,
            }
        });
        
        res.status(200).json(successResponse(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS));
        return; 
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}