import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";


export const validateUserRole = (req: Request, res: Response, next: NextFunction)=>{
    const {role} = req.body;
    const allowedRole = ['contributor', 'maintainer'];

    if(role && !allowedRole.includes(role) ){
        throw new AppError("Invalid User Role", 400);
    }

    next();
}