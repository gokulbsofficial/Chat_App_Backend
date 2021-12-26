/* Installed Imported Modules */
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/* Custom Imported Modules */
import db from "./config/connection";
import logMiddleware from "./middlewares/logMiddleware";
import config from "./config/default";
import userAuthRouter from "./routers/userAuth";
import ErrorResponse from "./classes/errorResponse";

const { CLIENT_HOST } = config.CLIENT;

/* Config Variables */
const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//   (
//   cors({
//     origin: ["https://gs-chat-app.netlify.app/","https://socketserve.io/"],
//     methods: ["GET", "POST"]
//   })
// );

/* MONGOOSE connection */
db.connect();

/* All Api Logs */
app.use(logMiddleware);

/* Routes */
app.use("/auth/user", userAuthRouter);

app.use("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to GS-ChatApp",
  });
});

/* 404 Route */
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

export default app;
