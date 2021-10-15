/* Installed Imported Modules */
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import cors from "cors";

/* Custom Imported Modules */
import config from "./config/default";
import db from "./config/connection";
import logger from "./config/logger";
import logMiddleware from "./middlewares/logMiddleware";
import SocketIo from "./socketIo/socket";
import errorHandler from "./middlewares/errorHandler";

/* Config Variables */
const app = express();
const server = http.createServer(app);
const NAMESPACE = "Server";
const { SERVER_PORT, SERVER_HOST } = config.SERVER;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5500",
  })
);

/* MONGOOSE connection */
db.connect();

/* All Api Logs */
app.use(logMiddleware);

/* Socket Connection */
SocketIo(server);

/* Routes */
app.use("/", (req, res, next) => {
  const path = require("path");
  res.sendFile(path.join(__dirname, "/test.html"));
});

/* 404 Route */
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

/* Error Handling */
app.use(errorHandler);

/* SERVER listening */
server.listen(SERVER_PORT);
server.on("listening", () => {
  logger.info(
    NAMESPACE,
    `Server listening in HOST:[${SERVER_HOST}] PORT:[${SERVER_PORT}]`
  );
});
