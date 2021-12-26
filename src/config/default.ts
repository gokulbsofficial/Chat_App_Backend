import dotenv from "dotenv";
dotenv.config({ path: ".env.config" });


// Server Config
const DOTENV_STATE = process.env.DOTENV_STATE || false;
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
  DOTENV_STATE
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
const MONGO_USER = process.env.MONGO_USER || "gokul_sreejith";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "5006769GOKul+";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "ChatApp";
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${MONGO_DATABASE}`

const MONGO = {
  MONGO_USER,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_URI,
};

/* JWT Config */
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "khskrhktmgenmrn";
const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "1d";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "rueuuiwiggsjg";
const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || "1y";

const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || "hriagbjregbbfj";
const JWT_RESET_EXPIRE = process.env.JWT_RESET_EXPIRE || "5m";

const JWT_COOKIE_SECRET =
  process.env.JWT_COOKIE_SECRET || "ethweharibbgfb";
const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || "10m";

const JWT_ISSUER = process.env.JWT_ISSUER || SERVER_HOST;

const JWT = {
  JWT_ISSUER,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRE,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE,
  JWT_RESET_SECRET,
  JWT_RESET_EXPIRE,
  JWT_COOKIE_SECRET,
  JWT_COOKIE_EXPIRE,
};

/* TWILIO Config */
const TWILIO_ACCOUNT_SID =
  process.env.TWILIO_ACCOUNT_SID || "ACTWILIO_ACCOUNT_SID";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "TWILIO_AUTH_TOKEN";
const TWILIO_SERVICE_ID = process.env.TWILIO_SERVICES_ID || "TWILIO_SERVICE_ID";
const SMS_KEY = process.env.SMS_KEY || null;

const TWILIO = {
  TWILIO_ACCOUNT_SID,
  TWILIO_SERVICE_ID,
  TWILIO_AUTH_TOKEN,
  SMS_KEY,
};

/* ADMIN Config */
const ADMIN_ACCESS_TOKEN_NAME = process.env.ADMIN_ACCESS_TOKEN_NAME || "AD-AccessToken";
const ADMIN_ACCESS_SESSION_NAME = process.env.ADMIN_ACCESS_SESSION_NAME || "AD-AccessSession";
const ADMIN_REFRESH_TOKEN_NAME = process.env.ADMIN_REFRESH_TOKEN_NAME || "AD-RefreshToken";
const ADMIN_REFRESH_SESSION_NAME = process.env.ADMIN_REFRESH_SESSION_NAME || "AD-RefreshSession";

const ADMIN = {
  ADMIN_ACCESS_TOKEN_NAME,
  ADMIN_ACCESS_SESSION_NAME,
  ADMIN_REFRESH_TOKEN_NAME,
  ADMIN_REFRESH_SESSION_NAME,
};

/* USER Config */
const USER_ACCESS_TOKEN_NAME = process.env.USER_ACCESS_TOKEN_NAME || "US-AccessToken";
const USER_ACCESS_SESSION_NAME = process.env.USER_ACCESS_SESSION_NAME || "US-AccessSession";
const USER_REFRESH_TOKEN_NAME = process.env.USER_REFRESH_TOKEN_NAME || "US-RefreshToken";
const USER_REFRESH_SESSION_NAME = process.env.USER_REFRESH_SESSION_NAME || "US-RefreshSession";

const USER = {
  USER_ACCESS_TOKEN_NAME,
  USER_ACCESS_SESSION_NAME,
  USER_REFRESH_TOKEN_NAME,
  USER_REFRESH_SESSION_NAME,
};

const config = {
  MONGO,
  SERVER,
  CLIENT,
  JWT,
  TWILIO,
  ADMIN,
  USER,
};

export default config;
