import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

const deletePermission = async (req: Request, res: Response, next: NextFunction)=>{
    if(req.user.role === 'maintainer'){
        return next();
    }else{
        throw new AppError("forbidden access", 403);
    }
}

export default deletePermission;