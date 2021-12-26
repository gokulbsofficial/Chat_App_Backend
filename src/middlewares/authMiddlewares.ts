import { verifyJwtToken } from "../functions/jwt";
// import { ExtendedError } from "socket.io/dist/namespace";
import logger from "../config/logger";
import User from "../models/userModel";
import { ISocket } from "../interfaces/userInterfaces";

const NAMESPACE = "Auth_Middleware"
const Unauthorized_Event = "Unauthorized_Event"

export const authorization = async (socket: ISocket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token || null;

    if (!token) {
      return next(new Error("Token Not Found"));
    }

    const decoded = await verifyJwtToken(token, "ACCESS_TOKEN");

    const user = await User.findOne({ _id: decoded.userId }, {
      name: 1,
      userName: 1,
      mobile: 1,
      profilePic: 1,
      email: 1,
      accountStatus: 1
    })

    if (!user) {
      return next(new Error(Unauthorized_Event));
    }

    if (user && user.accountStatus.status === "Blocked") {
      return next(new Error(Unauthorized_Event));
    }

    socket.user = user;

    next();
  } catch (error: any) {
    return next(new Error(Unauthorized_Event));
  }
};

export const checkActive = async (events: any[], next: (err?: Error) => void) => {
  try {
    console.log(events)
    next();
    // if (events[1] && events[1].userId) {
    //   const user = await User.findOne({ _id: events[1].userId }, { accountStatus: 1 })

    //   if (user && user.accountStatus.status === "Active") {
    //     console.log(user)
    //     return next()
    //   } 
    // }
    // return next(new Error(Unauthorized_Event));
  } catch (error: any) {
    return next(new Error(Unauthorized_Event))
  }
}