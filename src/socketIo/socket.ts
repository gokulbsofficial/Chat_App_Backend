import { Server } from "socket.io";
import http from "http";

import config from "../config/default";
import userSocket from "./userSocket";
import adminSocket from "./adminSocket";
import userAuthSocket from "./userAuthSocket";
import adminAuthSocket from "./adminAuthSocket";

const SocketIo = (server: http.Server) => {
  const io: Server = new Server(server, {
    cors: {
      origin: ["https://gs-chat-app.netlify.app/","https://socketserve.io/"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      // credentials: true,
    },
  });

  // Sub sockets
  userSocket(io);
  adminSocket(io);
  userAuthSocket(io);
  adminAuthSocket(io);
};

export default SocketIo;
