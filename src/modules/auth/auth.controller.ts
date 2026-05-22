import type { Request, Response } from "express"
import { authService } from "./auth.service"
import sendResponse from "../../utils/sendRespose";
import { asyncHandler } from "../../utils/asyncHanlder";


const createUser = asyncHandler(async(req: Request, res: Response)=>{
    const result = await authService.createUserIntoDB(req.body);

    return sendResponse(res, {statusCode:201, success:true, message: "User registered successfully", data: result});
});

const loginUser = asyncHandler(async(req: Request, res: Response)=>{

    const { token, refreshToken, user } = await authService.loginUserFromDB(req.body);

    res.cookie('refreshToken', refreshToken, {
        secure: false, //! true in production
        httpOnly: true,
        sameSite: "lax"
    })

    sendResponse(res, {statusCode:200, success:true, message:"Login successful", data: {token, user}});
});

export const authController = {
    createUser,
    loginUser
}