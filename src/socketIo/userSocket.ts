import { Server } from "socket.io";
import logger from "../config/logger";
import events from "../config/socket-events";
import { ISocket, IUser } from "../interfaces/userInterfaces";
import { authMiddleware } from "../middlewares";
import * as userHelper from "../helpers/userHelper";
import ErrorResponse from "../classes/errorResponse";

const { CONNECTION_EVENT, DISCONNECT_EVENT, ERROR_EVENT } = events.SOCKET;
const { DISCONNECT_USER_EVENT, GET_USER_EVENT, CREATE_CONVERSATION_EVENT, GET_CONVERSATION_EVENT, GET_INBOXES_EVENT, LOGOUT_EVENT, NEW_INBOX_ARRIVED_EVENT, RECIEVED_MESSAGE_EVENT, SEARCH_USERS_EVENT, SENT_MESSAGE_EVENT, GET_USER_STATUS_EVENT, USER_TYPING_EVENT } = events.USER_SOCKET;

const NAMESPACE = "UserSocket";

const userSocket = (io: Server) => {
  const user = io.of("/user");

  // Check Valid User
  user.use(authMiddleware.authorization);

  user.on(CONNECTION_EVENT, (socket: ISocket) => {
    logger.info(
      NAMESPACE,
      `New Connection Established in USER => ${socket.id, socket.user?.name}`
    );
    socket.join(socket.user?._id)
    // Change User status
    userHelper.updateStatus(socket.user?._id, "ONLINE")

    // Check User is Active
    socket.use(authMiddleware.checkActive)

    socket.on(GET_USER_EVENT, () => {
      socket.emit("get-user", socket.user)
    })

    socket.on(GET_USER_STATUS_EVENT, () => {
      userHelper.getUserStatus(socket.user?._id).then((status) => {
        socket.emit("get-status", { success: true, status })
      }).catch((error: any) => {
        const errResp = new ErrorResponse(error.message).getErrorData();
        socket.emit("get-status", errResp)
      })
    })

    socket.on(USER_TYPING_EVENT, (state: boolean) => {
      const status: IUser["userStatus"] = state ? "TYPING" : "ONLINE"
      userHelper.updateStatus(socket.user?._id, status)
    })

    socket.on(SEARCH_USERS_EVENT, (quary: string) => {
      userHelper
        .searchUsers(quary,socket.user?._id)
        .then((response) => {
          socket.emit(SEARCH_USERS_EVENT, { success: true, users: response });
        })
        .catch((error: any) => {
          const errResp = new ErrorResponse(error.message).getErrorData();
          socket.emit(SEARCH_USERS_EVENT, errResp);
        });
    });

    socket.on(ERROR_EVENT, (err) => {
      if (err && err.message === "Unauthorized_Event") {
        socket.disconnect();
      }
      console.log(err)
    });

    socket.on(DISCONNECT_USER_EVENT, () => {
      socket.disconnect();
    });

    socket.on(DISCONNECT_EVENT, () => {
      logger.info(NAMESPACE, `One socket disconnected in USER => ${socket.id, socket.user?.name}`);
      // Change User Status
      userHelper.updateStatus(socket.user?._id, "OFFLINE")
    });
  });
};

export default userSocket;
