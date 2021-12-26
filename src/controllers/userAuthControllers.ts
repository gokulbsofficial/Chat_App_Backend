import { generateJwtToken, verifyJwtToken } from "../functions/jwt";
import config from "../config/default";
import { Request, Response, NextFunction } from "express"

const {
    SERVER_NODE_ENV,
    SERVER_ACCESS_TOKEN_EXPIRE,
    SERVER_REFRESH_TOKEN_EXPIRE,
} = config.SERVER;

const {
    USER_ACCESS_TOKEN_NAME,
    USER_REFRESH_TOKEN_NAME,
    USER_ACCESS_SESSION_NAME,
    USER_REFRESH_SESSION_NAME,
} = config.USER;


export const SetCookie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                success: false,
                message: "Authorization"
            })
        }
        const decoded = await verifyJwtToken(req.headers.authorization ?? "", "COOKIE_TOKEN");

        const accessToken = await generateJwtToken(
            {
                userId: decoded.userId,
                userName: decoded.aud,
            },
            "ACCESS_TOKEN"
        );
        const refreshToken = await generateJwtToken(
            {
                userId: decoded.userId,
                userName: decoded.aud,
            },
            "REFRESH_TOKEN"
        );
        res.cookie(USER_ACCESS_TOKEN_NAME, accessToken, {
            httpOnly: true,
            secure: SERVER_NODE_ENV === "production" ? true : false,
            expires: new Date(
                new Date().getTime() + parseInt(SERVER_ACCESS_TOKEN_EXPIRE)
            ),
            sameSite: "strict",
        })
        res.cookie(USER_ACCESS_SESSION_NAME, true, {
            httpOnly: true,
            expires: new Date(
                new Date().getTime() + parseInt(SERVER_ACCESS_TOKEN_EXPIRE)
            ),
        })
        res.cookie(USER_REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            secure: SERVER_NODE_ENV === "production" ? true : false,
            expires: new Date(
                new Date().getTime() + parseInt(SERVER_REFRESH_TOKEN_EXPIRE)
            ),
            sameSite: "strict",
        })
        res.cookie(USER_REFRESH_SESSION_NAME, true, {
            httpOnly: true,
            expires: new Date(
                new Date().getTime() + parseInt(SERVER_REFRESH_TOKEN_EXPIRE)
            ),
        })
        res.status(200).json({
            success: true,
            message: "Cookie Added",
            token: accessToken
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Error"
        })
    }
}