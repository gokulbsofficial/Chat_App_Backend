import { Server, Socket } from "socket.io";
import http from "http";

import config from "../config/default";
import ErrorResponse from "../classes/errorResponse";
import userSocket from "./userSocket";
import adminSocket from "./adminSocket";
import userAuthSocket from "./userAuthSocket";
import adminAuthSocket from "./adminAuthSocket";

const SocketIo = (server: http.Server) => {
  const io: Server = require("socket.io")(server, {
    cors: {
      origin: ["*"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  // Sub sockets
  userSocket(io);
  adminSocket(io);
  userAuthSocket(io);
  adminAuthSocket(io);
};

export default SocketIo;