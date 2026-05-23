import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyToken } from "../utils/jwt";
import { authService } from "../modules/auth/auth.service";
import type { Role } from "../modules/auth/auth.Interface";

export const auth = async (req: Request, res:Response, next: NextFunction)=> {
    const token = req.headers.authorization;

    if(!token){
        throw new AppError("Unauthorized access", 401);
    }

    const decoded = verifyToken(token, "access");

    const user = await authService.getUserById(decoded.id);

    req.user = user;
    next();
}

export const authorizedRoles = (...roles: Role[])=>{
    return async(req: Request, res: Response, next:NextFunction)=>{
        if(!req.user){
            throw new AppError("Unauthorized access", 401)
        }
        if(roles.length && !roles.includes(req.user.role)){
            throw new AppError("Forbidden access", 403);
        }
        next();
    }
}