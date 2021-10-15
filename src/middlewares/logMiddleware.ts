/* Custom Imported Modules */
import logger from '../config/logger';
import { ApiParams } from '../types/default';

/* Config Variables */
const NAMESPACE = "API LOG"

const loggerMiddleware: ApiParams = (req, res, next) => {
    logger.info(NAMESPACE, ` METHOD:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}]`)
    res.on("finish", () => {
        logger.info(NAMESPACE, ` METHOD:[${req.method}] - URL:[${req.url}] - STATUS:[${res.statusCode}] - IP:[${req.socket.remoteAddress}]`)
    })
    next();
}

export default loggerMiddleware