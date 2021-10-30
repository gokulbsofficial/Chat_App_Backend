import dotenv from "dotenv";
dotenv.config({ path: ".env.config" });

// Server Config
const SERVER_NODE_ENV = process.env.SERVER_NODE_ENV || "development";
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_ACCESS_TOKEN_EXPIRE =
  process.env.SERVER_ACCESS_TOKEN_EXPIRE || "86400000"; // 1day
const SERVER_REFRESH_TOKEN_EXPIRE =
  process.env.SERVER_ACCESS_TOKEN_EXPIRE || "31557600000"; // 1yr

const SERVER = {
  SERVER_NODE_ENV,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_ACCESS_TOKEN_EXPIRE,
  SERVER_REFRESH_TOKEN_EXPIRE,
};

// Client Config
const CLIENT_HOST = process.env.CLIENT_HOST || "https://socketserve.io/";
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const CLIENT_GOOGLE_AUTH_CLIENT_ID =
  process.env.CLIENT_GOOGLE_AUTH_CLINENT_ID || "CLINENT_ID";

const CLIENT = {
  CLIENT_HOST,
  CLIENT_PORT,
  CLIENT_GOOGLE_AUTH_CLIENT_ID,
};

// Moongose config
const MONGOOSE_USER = process.env.MONGOOSE_USER || "gokul_sreejith";
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD || "5006769GOKul+";
const MONGOOSE_HOST = process.env.MONGOOSE_HOST || "localhost";
const MONGOOSE_DATABASE = process.env.MONGOOSE_DATABASE || "ChatApp";

const MONGOOSE = {
  MONGOOSE_USER,
  MONGOOSE_HOST,
  MONGOOSE_PASSWORD,
  MONGOOSE_DATABASE,
  MONGOOSE_URL: `mongodb://localhost:27017/${MONGOOSE_DATABASE}`,
};

/* JWT Config */
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "khskrhktmgenmrn";
const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "1d";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "rueuuiwiggsjg";
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || "1y";

const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "hriagbjregbbfj";
const JWT_RESET_EXPIRE = process.env.JWT_RESET_EXPIRE || "5m";

const JWT_ACTIVATION_SECRET =
  process.env.JWT_ACTIVATION_SECRET || "ethweharibbgfb";
const JWT_ACTIVATION_EXPIRE = process.env.JWT_ACTIVATION_EXPIRE || "10m";

const JWT_ISSUER = process.env.JWT_ISSUER || SERVER_HOST;

const JWT = {
  JWT_ISSUER,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRE,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE,
  JWT_RESET_SECRET,
  JWT_RESET_EXPIRE,
  JWT_ACTIVATION_SECRET,
  JWT_ACTIVATION_EXPIRE,
};

/* TWILIO Config */
const TWILIO_ACCOUNT_SID =
  process.env.TWILIO_ACCOUNT_SID || "ACTWILIO_ACCOUNT_SID";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "TWILIO_AUTH_TOKEN";
const TWILIO_SERVICE_ID = process.env.TWILIO_SERVICE_ID || "TWILIO_SERVICE_ID";
const SMS_KEY = process.env.SMS_KEY || null;

const TWILIO = {
  TWILIO_ACCOUNT_SID,
  TWILIO_SERVICE_ID,
  TWILIO_AUTH_TOKEN,
  SMS_KEY,
};

/* ADMIN Config */
const ADMIN_ACCESS_TOKEN_NAME = "AD-AccessToken";
const ADMIN_ACCESS_SESSION_NAME = "AD-AccessSession";
const ADMIN_REFRESH_TOKEN_NAME = "AD-RefreshToken";
const ADMIN_REFRESH_SESSION_NAME = "AD-RefreshSession";

const ADMIN = {
  ADMIN_ACCESS_TOKEN_NAME,
  ADMIN_ACCESS_SESSION_NAME,
  ADMIN_REFRESH_TOKEN_NAME,
  ADMIN_REFRESH_SESSION_NAME,
};

/* USER Config */
const USER_ACCESS_TOKEN_NAME = "US-AccessToken";
const USER_ACCESS_SESSION_NAME = "US-AccessSession";
const USER_REFRESH_TOKEN_NAME = "US-RefreshToken";
const USER_REFRESH_SESSION_NAME = "US-RefreshSession";

const USER = {
  USER_ACCESS_TOKEN_NAME,
  USER_ACCESS_SESSION_NAME,
  USER_REFRESH_TOKEN_NAME,
  USER_REFRESH_SESSION_NAME,
};

const config = {
  MONGOOSE,
  SERVER,
  CLIENT,
  JWT,
  TWILIO,
  ADMIN,
  USER,
};

export default config;
