import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { issueService } from "../modules/issues/issue.service";


export const editPermission = async (req: Request, res: Response, next: NextFunction)=>{

    if(req.user.role === "maintainer"){
        return next();
    }
    if(req.user.role === "contributor"){
        const issue = await issueService.getSingleIssueFromDB(req.params.id);
  
        const isOwner = req.user.id === issue.reporter_id;
        const isOpen = issue.status === "open"

        if(!isOwner || !isOpen){
            throw new AppError("Forbidden access", 403);
        }
        return next();
    }

}