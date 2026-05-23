import type { Response } from "express";

type TResponse<T> = {
    statusCode?: number,
    success?: boolean;
    message: string;
    data?: T;
}

const sendResponse = <T>(res: Response, response:TResponse<T>)=>{
    const { statusCode = 200, success = true, message, data } = response;
    res.status(statusCode).json({
        success,
        message,
        data,
    })
}

export default sendResponse;