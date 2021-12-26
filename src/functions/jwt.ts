import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/default";
import { IPayload } from "../interfaces/default";
import { TokenType } from "../types/default";

const {
  JWT_ACCESS_EXPIRE,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRE,
  JWT_REFRESH_SECRET,
  JWT_COOKIE_EXPIRE,
  JWT_COOKIE_SECRET,
  JWT_RESET_EXPIRE,
  JWT_RESET_SECRET,
  JWT_ISSUER,
} = config.JWT;

export const generateJwtToken = (
  payload: IPayload,
  type: TokenType
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    switch (type) {
      case "ACCESS_TOKEN":
        jwt.sign(
          {
            userId: payload.userId?.toString(),
          },
          JWT_ACCESS_SECRET,
          {
            issuer: JWT_ISSUER,
            subject: type,
            audience: payload.userName,
            expiresIn: JWT_ACCESS_EXPIRE,
          },
          (err, token) => {
            if (err) {
              return reject({
                name: err.name,
                msg: err.message,
                stack: err.stack,
              });
            }
            if (token) {
              return resolve(token);
            } else {
              reject({ msg: "Token Generation failed" });
            }
          }
        );
        break;
      case "REFRESH_TOKEN":
        jwt.sign(
          {
            userId: payload.userId?.toString(),
          },
          JWT_REFRESH_SECRET,
          {
            issuer: JWT_ISSUER,
            subject: type,
            audience: payload.userName,
            expiresIn: JWT_REFRESH_EXPIRE,
          },
          (err, token) => {
            if (err) {
              return reject({
                name: err.name,
                msg: err.message,
                stack: err.stack,
              });
            }
            if (token) {
              return resolve(token);
            } else {
              reject({ msg: "Token Generation failed" });
            }
          }
        );
        break;
      case "RESET_TOKEN":
        jwt.sign(
          {
            userId: payload.userId?.toString(),
          },
          JWT_RESET_SECRET,
          {
            issuer: JWT_ISSUER,
            subject: type,
            audience: payload.userName,
            expiresIn: JWT_RESET_EXPIRE,
          },
          (err, token) => {
            if (err) {
              return reject({
                name: err.name,
                msg: err.message,
                stack: err.stack,
              });
            }
            if (token) {
              return resolve(token);
            } else {
              reject({ msg: "Token Generation failed" });
            }
          }
        );
        break;
      case "COOKIE_TOKEN":
        jwt.sign(
          {
            userId: payload.userId?.toString(),
          },
          JWT_COOKIE_SECRET,
          {
            issuer: JWT_ISSUER,
            subject: type,
            audience: payload.userName,
            expiresIn: JWT_COOKIE_EXPIRE,
          },
          (err, token) => {
            if (err) {
              return reject({
                name: err.name,
                msg: err.message,
                stack: err.stack,
              });
            }
            if (token) {
              return resolve(token);
            } else {
              reject({ msg: "Token Generation failed" });
            }
          }
        );
        break;
      default:
        return reject({ msg: "Default" });
    }
  });
};

export const verifyJwtToken = (
  token: string,
  type: TokenType
): Promise<JwtPayload> => {
  return new Promise(async (resolve, reject) => {
    switch (type) {
      case "ACCESS_TOKEN":
        jwt.verify(token, JWT_ACCESS_SECRET, (err, decoded) => {
          if (err) {
            return reject({
              name: err.name,
              msg: err.message,
              stack: err.stack,
            });
          }
          if (decoded) {
            return resolve(decoded);
          } else {
            reject({ msg: "Token verification failed" });
          }
        });
        break;
      case "REFRESH_TOKEN":
        jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
          if (err) {
            return reject({
              name: err.name,
              msg: err.message,
              stack: err.stack,
            });
          }
          if (decoded) {
            return resolve(decoded);
          } else {
            reject({ msg: "Token verification failed" });
          }
        });
        break;
      case "RESET_TOKEN":
        jwt.verify(token, JWT_RESET_SECRET, (err, decoded) => {
          if (err) {
            return reject({
              name: err.name,
              msg: err.message,
              stack: err.stack,
            });
          }
          if (decoded) {
            return resolve(decoded);
          } else {
            reject({ msg: "Token verification failed" });
          }
        });
        break;
      case "COOKIE_TOKEN":
        jwt.verify(token, JWT_COOKIE_SECRET, (err, decoded) => {
          if (err) {
            return reject({
              name: err.name,
              msg: err.message,
              stack: err.stack,
            });
          }
          if (decoded) {
            return resolve(decoded);
          } else {
            reject({ msg: "Token verification failed" });
          }
        });
        break;
      default:
        return reject({ msg: "Default" });
    }
  });
};
