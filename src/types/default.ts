/* Imported Modules */
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/userInterfaces";

interface IRequest extends Request {
  user?: IUser;
}

/* Custom Types */
export type ApiParams = (
  request: IRequest,
  response: Response,
  next: NextFunction
) => void;

export type LoggerParams = (
  namespace: string,
  message: string,
  additional?: object | string
) => void;

export type TokenType =
  | "ACCESS_TOKEN"
  | "REFRESH_TOKEN"
  | "RESET_TOKEN"
  | "COOKIE_TOKEN";
