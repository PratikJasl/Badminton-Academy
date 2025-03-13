import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";


const prisma = new PrismaClient();

export async function signUp(req: Request, res: Response) {
    let {fullName, age, gender, email, phone, password, role, joinDate, primaryLocation, coachingPlan} = req.body;
    console.log(fullName, age, gender, email, phone, password, role, joinDate, primaryLocation, coachingPlan);
    try {
        //Check for existing Users
        let existingUser = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })
        console.log("Existing User", existingUser);
        if(existingUser){
            res.status(400).json({success: "false", message: ERROR_MESSAGES.EXISTING_USER});
            return;
        }

        //Hash Password and store the user data
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password", hashedPassword);
        let newUser = await prisma.user.create({
            data:{
                fullName: fullName,
                age: age,
                gender: gender,
                email: email,
                phone: phone,
                password: hashedPassword,
                role: role,
                joinDate: joinDate,
                primaryLocation: primaryLocation,
                coachingPlan: coachingPlan
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

        res.status(200).json({success: true, message: SUCCESS_MESSAGES.USER_CREATED});
        return;
        
    } catch (error) {
        res.status(500).json({ success: "false", message: ERROR_MESSAGES.SERVER_ERROR, detail: error });
        return;
    }
}

export async function logIn(req: Request, res: Response) {
    
}

export async function logOut(req: Request, res: Response) {
    
}