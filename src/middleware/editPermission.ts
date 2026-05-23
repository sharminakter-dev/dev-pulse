import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { issueService } from "../modules/issues/issue.service";


export const editPermission = async (req: Request, res: Response, next: NextFunction)=>{

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }

    if(req.user.role === "maintainer"){
        return next();
    }
    if(req.user.role === "contributor"){

        const id = req.params.id;

        if (!id){
            throw new AppError("Missing id", 400);
        }

        const issue = await issueService.getSingleIssueFromDB(id as string);
  
        const isOwner = req.user.id === issue.reporter_id;
        const isOpen = issue.status === "open"

        if(!isOwner || !isOpen){
            throw new AppError("Forbidden access", 403);
        }
        return next();
    }

}