import { ObjectId } from "mongodb";

export interface IPayload {
  userId?: string | ObjectId;
  adminId?: string | ObjectId;
  userName?: string | string[];
  email?: string;
}

export interface IAuthResponse {
  message: string;
}

export interface IErrorResponse {
  message: string;
  code?: string;
}
