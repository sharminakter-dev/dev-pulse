import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHanlder";
import { issueService } from "./issue.service";
import sendResponse from "../../utils/sendRespose";

const createIssue = asyncHandler( async(req: Request, res: Response)=>{

    const reporter_id = req.user!.id ;
    const result = await issueService.createIssueIntoDB(req.body, reporter_id );

    return sendResponse(res, {statusCode:201, success: true, message:"issue created successfully", data: result} );
});

const getAllIssues = asyncHandler( async(req: Request, res: Response)=>{

    const result = await issueService.getALLIssuesFromDB(req.query);

    return sendResponse(res, {statusCode:200, success: true, message:"issues retrived successfully", data: result});
});

const getUserById = asyncHandler(async(req: Request, res: Response)=>{
    const {id} = req.params;

    const issue = await issueService.getSingleIssueFromDB(id as string);

    return sendResponse(res, {statusCode:200, success:true, message:"Issue retrived Successfully", data: issue})
});

const updateIssueById = asyncHandler(async(req: Request, res: Response)=>{
    const {id} = req.params;

    const updatedIssue = await issueService.updateIssueIntoDB(req.body, id as string);
    return sendResponse(res, {
        statusCode:200, 
        success:true, 
        message:"Issue updated successfully", 
        data:updatedIssue
    });
});

const deleteIssueById = asyncHandler(async(req: Request, res: Response)=>{
    const id = req.params.id;

    await issueService.deleteIssueFromDB(id as string);

    return sendResponse(res, {statusCode:200, success:true, message: "Issue deleted successfully"});
});

export const issuceController = {
    createIssue,
    getAllIssues,
    getUserById,
    updateIssueById,
    deleteIssueById
};