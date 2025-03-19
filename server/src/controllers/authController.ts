import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";


const prisma = new PrismaClient();

export async function signUp(req: Request, res: Response) {
    let {
        fullName, 
        dob, 
        gender, 
        email, 
        phone, 
        password, 
        role, 
        joinDate, 
        locationId, 
        coachingPlanId, 
        planEndDate,
        planStartDate
    } = req.body;
    
    try {
        //Check for existing Users
        let existingUser = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })

        if(existingUser){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.USER_ALREADY_EXISTS});
            return;
        }

        //Check for existing location
        let location = await prisma.location.findUnique({
            where: {locationId: locationId}
        })

        if (!location) {
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.INVALID_LOCATION_ID});
            return
        }

        //Check for existing Coaching Plan
        let coachingPlan = await prisma.coachingPlan.findUnique({
            where: {coachingPlanId: coachingPlanId}
        })

        if( !coachingPlan){
            res.status(400).json({ success: "false", message: ERROR_MESSAGES.INVALID_COACHING_PLAN_ID});
            return
        }

        //Hash Password and store the user data
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password", hashedPassword);
        let newUser = await prisma.user.create({
            data:{
                fullName: fullName,
                dob: dob,
                gender: gender,
                email: email,
                phone: phone,
                password: hashedPassword,
                role: role,
                joinDate: joinDate,
                Location: {
                    connect: {locationId: locationId}
                },
                coachingPlan: {
                    connect: {coachingPlanId: coachingPlanId}
                },
                planEndDate: planEndDate,
                planStartDate: planStartDate
            }
        });
        console.log("New user created");

        //Generate JWT token and send it in response cookies.
        let token = jwt.sign({ id: newUser.userId}, process.env.JWT_SECRET as string, {expiresIn: '7d'});
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

        res.status(201).json({success: true, message: SUCCESS_MESSAGES.USER_CREATED, details: newUser });
        return;
        
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return;
    }
}

export async function logIn(req: Request, res: Response) {
    let {email, password} = req.body;

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

        //Compare Password, and generate JWT token, and send it in cookies.
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
               res.status(400).json({success: "false", message: ERROR_MESSAGES.INCORRECT_PASSWORD, details: isMatch}); 
               return;
            }

            const token = jwt.sign({ id: user.userId}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json({success: "true", message: SUCCESS_MESSAGES.USER_LOGIN});
            return;
        }
    } catch (error) {
        res.json(500).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detatils: error});
        return
    }
}

export async function logOut(req: Request, res: Response) {
    //Clear the clients cookies.
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json({success: "true", message: SUCCESS_MESSAGES.USER_LOGOUT});
        return;
    } catch (error) {
        res.json(500).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detatils: error});
        return; 
    }
}