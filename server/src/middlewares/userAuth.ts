import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";

export function userAuth(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;
    
    if(!token){
        res.status(401).json({success: "false", message: ERROR_MESSAGES.NOT_AUTH});
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(401).json({ success: "false", message: ERROR_MESSAGES.JWT_SECRET_ERROR });
            return;
        }
        
        const tokenDecode = jwt.verify(token, secret);

        if (tokenDecode && typeof tokenDecode === 'object' && 'id' in tokenDecode) {
            req.body.userId = tokenDecode.id;
        }else{
            res.status(401).json({ success: "false", message: ERROR_MESSAGES.NOT_AUTH });
            return;
        }
        next();

    } catch (error) {
        res.status(401).json({success: "false", message: ERROR_MESSAGES.SERVER_ERROR, details: error});
        return;
    }
}