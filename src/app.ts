import express, { type Request, type Response } from "express";
import cookieParser from 'cookie-parser'
import globalErrorHandler from "./middleware/globalErrorHanlder";
import logger from "./middleware/logger";
import sendResponse from "./utils/sendRespose";
import { authRoute } from "./modules/auth/auth.router";

const app = express();

app.use(logger);
// app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.get('/', (req: Request, res:Response)=>{
    sendResponse(res, {message: "Dev pulse api", data: null});
});

app.use('/api/auth', authRoute);


app.use(globalErrorHandler);
export default app;