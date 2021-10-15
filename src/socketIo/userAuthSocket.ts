import { Server, Socket } from "socket.io";
import cookie from "cookie";

import * as authHelper from "../helpers/userAuthHelper";
import logger from "../config/logger";
import events from "../config/socket-events";
import {
  ICloudPasswdResponse,
  ICloudPassword,
  ILoginProfile,
  ILoginResponse,
  ISentOtp,
  ISentOtpResponse,
  IVerifyOtp,
} from "../interfaces/authInterfaces";
import ErrorResponse from "../classes/errorResponse";
import * as twilio from "../functions/twillio";
import { IErrorResponse } from "../interfaces/default";

const { CONNECTION_EVENT, DISCONNECT_EVENT } = events.SOCKET;
const {
  SENT_OTP_EVENT,
  VERIFY_OTP_EVENT,
  LOGIN_PROFILE_EVENT,
  CLOUD_PASSWORD_EVENT,
  FORGET_PASSWORD_EVENT,
  RESET_PASSWORD_EVENT,
  REFRESH_TOKEN_EVENT,
  DISCONNECT_USER_AUTH_EVENT,
} = events.USER_AUTH_SOCKET;

const NAMESPACE = "UserSocket";

const userAdminSocket = (io: Server) => {
  const auth = io.of("/auth/user");

  auth.on(CONNECTION_EVENT, (socket: Socket) => {
    const cookies = cookie.parse(socket.request.headers.cookie || "");
    logger.info(NAMESPACE, `Cookies => `, cookies);
    logger.info(
      NAMESPACE,
      `New Connection Established in AUTH => ${socket.id}`
    );

    socket.on(SENT_OTP_EVENT, (data: ISentOtp) => {
      const { mobile, channel } = data;
      twilio
        .sentOtp(mobile, channel)
        .then((response: ISentOtpResponse) => {
          socket.emit(SENT_OTP_EVENT, {
            success: true,
            data: {
              message: response.message,
              sid: response.sid,
            },
          });
        })
        .catch((error: IErrorResponse) => {
          const Error = new ErrorResponse(error.message, error.code);
          socket.emit(SENT_OTP_EVENT, Error.getErrorData());
        });
    });

    socket.on(VERIFY_OTP_EVENT, async (data: IVerifyOtp) => {
      const { mobile, code } = data;
      try {
        await twilio.verifyOtp(mobile, code);

        const doLogin: ILoginResponse = await authHelper.doLogin(mobile, false);

        socket.emit(VERIFY_OTP_EVENT, {
          success: true,
          data: doLogin.data,
        });
      } catch (error) {
        const Error = new ErrorResponse(error.message, error.code);
        socket.emit(VERIFY_OTP_EVENT, Error.getErrorData());
      }
    });

    socket.on(LOGIN_PROFILE_EVENT, async (data: ILoginProfile) => {
      try {
        await authHelper.loginProfile(data);
        const doLogin: ILoginResponse = await authHelper.doLogin(
          data.mobile,
          false
        );
        socket.emit(LOGIN_PROFILE_EVENT, {
          success: true,
          data: doLogin.data,
        });
      } catch (error) {
        const Error = new ErrorResponse(error.message, error.code);
        socket.emit(LOGIN_PROFILE_EVENT, Error.getErrorData());
      }
    });

    socket.on(CLOUD_PASSWORD_EVENT, async (data: ICloudPassword) => {
      try {
        const { mobile, password } = data;
        const resp: ICloudPasswdResponse = await authHelper.cloudPassword(
          mobile,
          password
        );
        const doLogin: ILoginResponse = await authHelper.doLogin(
          data.mobile,
          resp.verified
        );
        socket.emit(CLOUD_PASSWORD_EVENT, {
          success: true,
          data: doLogin.data,
        });
      } catch (error) {
        const Error = new ErrorResponse(error.message, error.code);
        socket.emit(CLOUD_PASSWORD_EVENT, Error.getErrorData());
      }
    });

    socket.on(FORGET_PASSWORD_EVENT, (data: { email: string }) => {
      const { email } = data;
      authHelper
        .forgetPasswod(email)
        .then((response: any) => {
          socket.emit(FORGET_PASSWORD_EVENT, {
            success: true,
            data: {
              message: response.message,
              sid: response.sid,
            },
          });
        })
        .catch((error: IErrorResponse) => {
          const Error = new ErrorResponse(error.message, error.code);
          socket.emit(FORGET_PASSWORD_EVENT, Error.getErrorData());
        });
    });

    socket.on(RESET_PASSWORD_EVENT, (data: any) => {
      const { password, token } = data;
      authHelper
        .resetPassword(password, token)
        .then((response: any) => {
          socket.emit(RESET_PASSWORD_EVENT, {
            success: true,
            data: {
              message: response.message,
              sid: response.sid,
            },
          });
        })
        .catch((error: IErrorResponse) => {
          const Error = new ErrorResponse(error.message, error.code);
          socket.emit(RESET_PASSWORD_EVENT, Error.getErrorData());
        });
    });

    socket.on(DISCONNECT_USER_AUTH_EVENT, () => {
      socket.disconnect();
    });

    socket.on(DISCONNECT_EVENT, () => {
      logger.info(NAMESPACE, `One socket disconnected in AUTH => ${socket.id}`);
    });
  });
};

export default userAdminSocket;
