import type { Response } from "express";

type TResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
}

const sendResponse = <T>(res: Response, { success, message, data}:TResponse<T>, statusCode = 200)=>{
    res.status(statusCode).json({
        success,
        message,
        data,
    })
}

export default sendResponse;