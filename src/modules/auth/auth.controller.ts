import type { Request, Response } from "express"
import { authService } from "./auth.service"
import sendResponse from "../../utils/sendRespose";
import { asyncHandler } from "../../utils/asyncHanlder";
import { loginToken, verifyToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";



const createUser = asyncHandler(async(req: Request, res: Response)=>{
    const result = await authService.createUserIntoDB(req.body);

    return sendResponse(res, {statusCode:201, success:true, message: "User registered successfully", data: result});
});

const loginUser = asyncHandler(async(req: Request, res: Response)=>{

    const user = await authService.loginUserFromDB(req.body);
    // console.log(user);

    const {token, refreshToken} = loginToken(user);

    res.cookie('refreshToken', refreshToken, {
        secure: false, //! true in production
        httpOnly: true,
        sameSite: "lax"
    })

    return sendResponse(res, {statusCode:200, success:true, message:"Login successful", data: {token, user}});
});

const refresh = asyncHandler(async(req: Request, res: Response)=>{
    const refreshToken = req.cookies?.refreshToken;
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InN1cGVybWFuIiwicm9sZSI6ImNvbnRyaWJ1dG9yIiwiaWF0IjoxNzc5NTE0NTY2LCJleHAiOjE3Nzk1NTA1NjZ9._vJY1b4cW2VNuzQ1ORWKSR4bGs4U0QME479wkGJVyuU";

    if(!refreshToken){
        throw new AppError("Unauthorized access", 401);    
    }
    const payload = verifyToken(refreshToken, "refresh");

    const user = await authService.getUserById(payload.id);

    const {token: accessToken, refreshToken: newRefreshTOken} = loginToken(user);

    res.cookie("refreshToken", newRefreshTOken, {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    });

    return sendResponse(res, {
        statusCode:200, 
        success: true, 
        message: "token refreshed successfully.", 
        data: {accessToken}
    });

});

export const authController = {
    createUser,
    loginUser,
    refresh,
}