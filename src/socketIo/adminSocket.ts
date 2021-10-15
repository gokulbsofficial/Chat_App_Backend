import { Server, Socket } from "socket.io";
import logger from "../config/logger";
import events from "../config/socket-events";

const { CONNECTION_EVENT, DISCONNECT_EVENT } = events.SOCKET;
const { DISCONNECT_ADMIN_EVENT } = events.ADMIN_SOCKET;

const NAMESPACE = "AdminSocket";

const adminSocket = (io: Server) => {
  const admin = io.of("/admin");

  admin.on(CONNECTION_EVENT, (socket: Socket) => {
    logger.info(
      NAMESPACE,
      `New Connection Established in ADMIN => ${socket.id}`
    );
    socket.on(DISCONNECT_ADMIN_EVENT, () => {
      socket.disconnect();
    });

    socket.on(DISCONNECT_EVENT, () => {
      logger.info(
        NAMESPACE,
        `One socket disconnected in ADMIN => ${socket.id}`
      );
    });
  });
};

export default adminSocket;
