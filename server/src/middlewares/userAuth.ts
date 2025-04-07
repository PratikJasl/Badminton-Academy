import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/apiResponse";

export function userAuth(req: Request, res: Response, next: NextFunction){
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
        console.log("Decoded Token is:", tokenDecode);

        if (tokenDecode && typeof tokenDecode === 'object' && 'id' in tokenDecode) {
            req.body.userId = tokenDecode.id;
        }else{
            res.status(401).json(errorResponse(ERROR_MESSAGES.NOT_AUTH));
            return;
        }

        if(tokenDecode.role != "admin" || "coach"){
            res.status(401).json(errorResponse(ERROR_MESSAGES.NOT_AUTH))
        }
        next();
    } catch (error) {
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}