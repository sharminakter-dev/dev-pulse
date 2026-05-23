import express, { type Request, type Response } from "express";
import cookieParser from 'cookie-parser'
import globalErrorHandler from "./middleware/globalErrorHanlder";
import logger from "./middleware/logger";
import sendResponse from "./utils/sendRespose";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issue.route";
import cors from "cors";

const app = express();

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use(cors({
        origin: "http://localhost:3000",
    })
);

app.get('/', (req: Request, res:Response)=>{
    sendResponse(res, {message: "Dev pulse api", data: null});
});

app.use('/api/auth', authRoute);
app.use('/api/issues', issueRoute);


app.use(globalErrorHandler);
export default app;