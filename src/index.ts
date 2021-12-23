import http from "http";
import logger from "./config/logger";
import app from "./app";
import config from "./config/default";
import SocketIo from "./socketIo/socket";

const server = http.createServer(app);

const NAMESPACE = "Server";

/* Socket Connection */
SocketIo(server);

const { SERVER_PORT, SERVER_NODE_ENV, SERVER_HOST, DOTENV_STATE } = config.SERVER;

app.set("port", SERVER_PORT);

server.listen(SERVER_PORT);

server.on("listening", onListen);
server.on("error", onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof SERVER_PORT === "string" ? "Pipe " + SERVER_PORT : "Port " + SERVER_PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListen() {
  logger.info(
    NAMESPACE,
    `Server listening in HOST:[${SERVER_HOST}] PORT:[${SERVER_PORT}] in ${SERVER_NODE_ENV} mode and DOT_ENV_STATE is ${DOTENV_STATE ? "ACTIVE" : "INACTIVE"}`
  );
}

// handling uncaughtException and unhandledRejection
process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  })
  .on("uncaughtException", (err: any, origin: any) => {
    console.error("Uncaught Exception thrown", err, "on", origin);
  });
