import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { errorResponse } from "../common/apiResponse";
import { ERROR_MESSAGES } from "../common/messages";

//@dev: Middleware to authenticate user role and get user ID in req.body object.
export function userAuth(req: Request, res: Response, next: NextFunction): void{
    const token = req.cookies.token;
    console.log("Token received is:", token);
    
    if(!token){
        res.status(401).json(errorResponse(ERROR_MESSAGES.NOT_AUTH));
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(401).json(errorResponse(ERROR_MESSAGES.JWT_SECRET_ERROR));
            return;
        } 

        const tokenDecode = jwt.verify(token, secret);
        if (tokenDecode && typeof tokenDecode === 'object' && 'id' in tokenDecode) {
            req.body.userId = tokenDecode.id;
            console.log("Stored user Id in req.body is:", tokenDecode.id);
        }else{
            res.status(401).json(errorResponse(ERROR_MESSAGES.NOT_AUTH));
            return;
        }
        
        next();
    } catch (error) {
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}