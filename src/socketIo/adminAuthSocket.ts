import { Server, Socket } from "socket.io";
import logger from "../config/logger";
import events from "../config/socket-events";
import { IAdminLogin, IAdminLoginResponse } from "../interfaces/authInterfaces";
import * as authHelper from "../helpers/adminAuthHelper";
import { IErrorResponse } from "../interfaces/default";
import ErrorResponse from "../classes/errorResponse";
import * as twilio from "../functions/twillio";

const { CONNECTION_EVENT, DISCONNECT_EVENT } = events.SOCKET;
const { ADMIN_LOGIN, DISCONNECT_ADMIN_AUTH_EVENT } = events.ADMIN_AUTH_SOCKET;
const NAMESPACE = "AdminAuthSocket";

const adminAuthSocket = (io: Server) => {
  const auth = io.of("/auth/admin");

  auth.on(CONNECTION_EVENT, (socket: Socket) => {
    logger.info(
      NAMESPACE,
      `New Connection Established in AUTH => ${socket.id}`
    );

    socket.on(ADMIN_LOGIN, async (data: IAdminLogin) => {
      try {
        const { email, password } = data;
        const response: IAdminLoginResponse = await authHelper.adminLogin(
          email,
          password
        );
        const { mobile, message, twoStepVerification, token } = response;
        if (twoStepVerification) {
          // Sent twoStepVerify Code
          await twilio.sentOtp(mobile, "sms");
        }
        if (!twoStepVerification) {
          // Sent Logged Mail
          console.log(`Your account is logged by ${socket.handshake.address}`);
        }
        socket.emit(ADMIN_LOGIN, {
          success: true,
          data: {
            message,
            twoStepVerification,
            token,
          },
        });
      } catch (error: any) {
        const errResp = new ErrorResponse(error.message, error.code).getErrorData();
        socket.emit(ADMIN_LOGIN, errResp);
      }
    });

    socket.on(DISCONNECT_ADMIN_AUTH_EVENT, () => {
      socket.disconnect();
    });

    socket.on(DISCONNECT_EVENT, () => {
      logger.info(NAMESPACE, `One socket disconnected in AUTH => ${socket.id}`);
    });
  });
};

export default adminAuthSocket;
