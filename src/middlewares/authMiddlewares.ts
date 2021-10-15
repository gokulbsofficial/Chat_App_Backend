import { verifyJwtToken } from "../functions/jwt";
import { ApiParams } from "../types/default";
import ErrorResponse from "../classes/errorResponse";
// import userAuthHelper from "../helpers/userAuthHelper";
// import adminAuthHelper from "../helpers/adminAuthHelper";
import { IAuthResponse, IErrorResponse } from "../interfaces/default";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

// export const verifyLogin: ApiParams = async (req, res, next) => {
//   try {
//     const AccessToken = req.cookies.AccessToken;

//     if (AccessToken) {
//       const token = req.headers.authorization?.split(" ")[1];

//       if (token) {
//         const decoded = await verifyJwtToken(token, "ACCESS_TOKEN");
//         userAuthHelper
//           .checkUserStatus(decoded.userId)
//           .then((res: IAuthResponse) => {
//             (req as any).user = {
//               userId: res.userId,
//               email: res.email,
//               name: res.name,
//             };
//             next();
//           })
//           .catch((error: IErrorResponse) => {
//             return next(new ErrorResponse(error.msg, 401, error.code));
//           });
//       } else {
//         return next(new ErrorResponse("Unauthonticated request", 401));
//       }
//     } else {
//       return next(new ErrorResponse("Access Token Not Found", 401));
//     }
//   } catch (error) {
//     return next(new ErrorResponse("Unauthonticated request", 401));
//   }
// };

// export const verifyUser: ApiParams = async (req, res, next) => {
//   try {
//     const AccessToken = req.cookies.AccessToken;

//     if (AccessToken) {
//       const token = req.headers.authorization?.split(" ")[1];

//       if (token) {
//         const decoded = await verifyJwtToken(token, "ACCESS_TOKEN");
//         userAuthHelper
//           .checkUserStatus(decoded.userId)
//           .then((res: IAuthResponse) => {
//             (req as any).user = {
//               userId: res.userId,
//               email: res.email,
//               name: res.name,
//             };
//             next();
//           })
//           .catch((error: IErrorResponse) => {
//             return next(new ErrorResponse(error.msg, 401, error.code));
//           });
//       } else {
//         return next(new ErrorResponse("Unauthonticated request", 401));
//       }
//     } else {
//       return next(new ErrorResponse("Access Token Not Found", 401));
//     }
//   } catch (error) {
//     return next(new ErrorResponse("Unauthonticated request", 401));
//   }
// };

// export const verifyAdmin: ApiParams = async (req, res, next) => {
//   try {
//     const AccessToken = req.cookies.AccessToken;

//     if (AccessToken) {
//       const token = req.headers.authorization?.split(" ")[1];

//       if (token) {
//         const decoded = await verifyJwtToken(token, "ACCESS_TOKEN");
//         console.log(decoded);

//         adminAuthHelper
//           .checkStatus(decoded.adminId, "ADMIN")
//           .then((res: IAuthResponse) => {
//             (req as any).admin = {
//               adminId: res.adminId,
//               email: res.email,
//               name: res.name,
//               role: res.role,
//             };
//             next();
//           })
//           .catch((error: IErrorResponse) => {
//             return next(new ErrorResponse(error.msg, 401, error.code));
//           });
//       } else {
//         return next(new ErrorResponse("Unauthonticated request", 401));
//       }
//     } else {
//       return next(new ErrorResponse("Access Token Not Found", 401));
//     }
//   } catch (error: any) {
//     return next(
//       new ErrorResponse(
//         error.message || error.msg || "Unauthonticated request",
//         401,
//         error.code || error.name
//       )
//     );
//   }
// };

// export const verifySuperAdmin: ApiParams = async (req, res, next) => {
//   try {
//     const AccessToken = req.cookies.AccessToken;

//     if (AccessToken) {
//       const token = req.headers.authorization?.split(" ")[1];
//       if (token) {
//         const decoded = await verifyJwtToken(token, "ACCESS_TOKEN");
//         adminAuthHelper
//           .checkStatus(decoded.adminId, "SUPER_ADMIN")
//           .then((res: IAuthResponse) => {
//             (req as any).admin = {
//               userId: res.userId,
//               email: res.email,
//               name: res.name,
//               role: res.role,
//             };
//             next();
//           })
//           .catch((error: IErrorResponse) => {
//             return next(new ErrorResponse(error.msg, 401, error.code));
//           });
//       } else {
//         return next(new ErrorResponse("Unauthonticated request", 401));
//       }
//     } else {
//       return next(new ErrorResponse("Access Token Not Found", 401));
//     }
//   } catch (error: any) {
//     return next(
//       new ErrorResponse(
//         error.message || error.msg || "Unauthonticated request",
//         error.code || 401
//       )
//     );
//   }
// };

const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const User = require("../models/userModel");
const { accessToken } = require("../config/default").server.token;
const { ObjectId } = require("mongoose").Types;

const NAMESPACES = "AuthMiddleware";

type authParams = (
  socket: Socket,
  next?: (err?: ExtendedError | undefined) => void
) => void;

const authorization: authParams = async (socket, next) => {
  try {
    const token: string | null = socket.handshake.auth.token || null;

    if (!token) {
      return next(new ErrorResponse("Token Not Found"));
    }

    const decoded = jwt.verify(token, accessToken.secret);

    const user = await User.aggregate([
      {
        $match: { _id: ObjectId(decoded.id) },
      },
      {
        $project: {
          name: 1,
          userName: 1,
          mobile: 1,
          profilePic: 1,
          email: 1,
          accountStatus: "$accounts.status",
        },
      },
    ]);

    if (!user) {
      return next(new ErrorResponse("Unauthorized event"));
    }

    if (user.length !== 0 && user[0].accountStatus === "Blocked") {
      return next(
        new ErrorResponse(`Yours account is Blocked for Spam Reports`)
      );
    }

    (socket as any).user = user[0];

    next();
  } catch (error) {
    logger.error(NAMESPACES, error.message, error);
    return next(new ErrorResponse("Unauthorized event"));
  }
};
