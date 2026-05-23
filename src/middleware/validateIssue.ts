import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import type { IssueMode } from "../modules/issues/issue.type";

export const validateIssue = (mode: IssueMode)=>{
        return(req: Request, res: Response, next: NextFunction) => { 
        const {title, description, type} = req.body;
        const allowedTypes = ["bug", "feature_request"];

        if(mode === "create"){
            console.log(title, description, type)
            if(!title || !description || !type){
                throw new AppError("All fields are required", 400);
            }
        }

        if(title && title.length>150){
            throw new AppError("Title too long", 400);
        }
        if(description && description.length<20){
            throw new AppError("Description too short", 400);
        }

        if(type && !allowedTypes.includes(type)){
            throw new AppError("Type should be 'feature_request' or 'bug' only.", 400);
        }

        next();
    }
}