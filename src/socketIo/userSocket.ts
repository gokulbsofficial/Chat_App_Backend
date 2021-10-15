import { Server, Socket } from "socket.io";
import logger from "../config/logger";
import events from "../config/socket-events";

const { CONNECTION_EVENT, DISCONNECT_EVENT } = events.SOCKET;
const { DISCONNECT_USER_EVENT } = events.USER_SOCKET;

const NAMESPACE = "UserSocket";

const userSocket = (io: Server) => {
  const user = io.of("/user");

  user.on(CONNECTION_EVENT, (socket: Socket) => {
    logger.info(
      NAMESPACE,
      `New Connection Established in USER => ${socket.id}`
    );
    socket.on(DISCONNECT_USER_EVENT, () => {
      socket.disconnect();
    });

    socket.on(DISCONNECT_EVENT, () => {
      logger.info(NAMESPACE, `One socket disconnected in USER => ${socket.id}`);
    });
  });
};

export default userSocket;
