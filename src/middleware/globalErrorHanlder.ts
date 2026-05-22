import type { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { AppError } from "../utils/AppError";

const globalErrorHandler = (
    err: unknown, 
    req: Request, 
    res: Response, 
    next: NextFunction
)=>{
    let status = 500;
    let message = "Internal server Error";
    let stack:  string | undefined;

    if(err instanceof AppError){
        status = err.statusCode;
        message = err.message; 
        stack = err.stack;
    }

    else if(err instanceof Error){
        message = err.message; 
        stack = err.stack;
    }
    
    res.status(status).json({
        success:false,
        message,
        error: err,
        stack: config.node_env === "development"? stack: undefined,
    })
}

export default globalErrorHandler;