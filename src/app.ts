import express from "express";
import cookieParser from 'cookie-parser'
import globalErrorHandler from "./middleware/globalErrorHanlder";
import logger from "./middleware/logger";

const app = express();

app.use(logger);
// app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));



app.use(globalErrorHandler);
export default app;