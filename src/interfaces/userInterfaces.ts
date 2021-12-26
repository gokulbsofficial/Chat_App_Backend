import { Document } from "mongoose";
import {
  IAccountDetails,
  IAccountLogs,
  IAccountStatus,
} from "./authInterfaces";
import { Socket } from "socket.io";

export interface IUser extends Document {
  name: string;
  userName: string;
  mobile: number;
  email?: string;
  userStatus?: "ONLINE" | "OFFLINE" | "TYPING";
  profilePic?: string;
  password: string;
  role?: "USER";
  twoStepVerification: boolean;
  accountStatus: IAccountStatus;
  accountDetails: IAccountDetails;
  accountLogs: IAccountLogs;
}

export interface UserBaseDocument extends IUser, Document {
  matchPasswords(password: string): boolean;
}

export interface ISocket extends Socket {
  user?: IUser,
  isActive?: boolean 
}