import config from "../config/default";
import cookie from "cookie";
const {
  SERVER_NODE_ENV,
  SERVER_ACCESS_TOKEN_EXPIRE,
  SERVER_REFRESH_TOKEN_EXPIRE,
} = config.SERVER;
const {
  ADMIN_ACCESS_TOKEN_NAME,
  ADMIN_REFRESH_TOKEN_NAME,
  ADMIN_ACCESS_SESSION_NAME,
  ADMIN_REFRESH_SESSION_NAME,
} = config.ADMIN;
const {
  USER_ACCESS_TOKEN_NAME,
  USER_REFRESH_TOKEN_NAME,
  USER_ACCESS_SESSION_NAME,
  USER_REFRESH_SESSION_NAME,
} = config.USER;

const setCookies = (
  who: "ADMIN" | "USER",
  name: string[],
  value: string
): string[] => {
  let cookies: string[] = [];
  if (name.includes("AccessToken")) {
    cookies.push(
      cookie.serialize(
        who === "ADMIN" ? ADMIN_ACCESS_TOKEN_NAME : USER_ACCESS_TOKEN_NAME,
        value,
        {
          httpOnly: true,
          secure: SERVER_NODE_ENV === "production" ? true : false,
          expires: new Date(
            new Date().getTime() + parseInt(SERVER_ACCESS_TOKEN_EXPIRE)
          ),
          sameSite: "strict",
        }
      )
    );
    cookies.push(
      cookie.serialize(
        who === "ADMIN" ? ADMIN_ACCESS_SESSION_NAME : USER_ACCESS_SESSION_NAME,
        String(true),
        {
          httpOnly: true,
          expires: new Date(
            new Date().getTime() + parseInt(SERVER_ACCESS_TOKEN_EXPIRE)
          ),
        }
      )
    );
  }
  if (name.includes("RefreshToken")) {
    cookies.push(
      cookie.serialize(
        who === "ADMIN" ? ADMIN_REFRESH_TOKEN_NAME : USER_REFRESH_TOKEN_NAME,
        value,
        {
          httpOnly: true,
          secure: SERVER_NODE_ENV === "production" ? true : false,
          expires: new Date(
            new Date().getTime() + parseInt(SERVER_REFRESH_TOKEN_EXPIRE)
          ),
          sameSite: "strict",
        }
      )
    );
    cookies.push(
      cookie.serialize(
        who === "ADMIN"
          ? ADMIN_REFRESH_SESSION_NAME
          : USER_REFRESH_SESSION_NAME,
        String(true),
        {
          httpOnly: true,
          expires: new Date(
            new Date().getTime() + parseInt(SERVER_REFRESH_TOKEN_EXPIRE)
          ),
        }
      )
    );
  }
  return cookies;
};

export default setCookies;
