/* Socket */

const CONNECTION_EVENT = "connection";
const DISCONNECT_EVENT = "disconnect";
const ERROR_EVENT = "error";
const UNAUTHORIZED_EVENT = "unauthorized";
const CONNECT_ERROR_EVENT = "connect_error";
const RECONNECT_ATTEMPT_EVENT = "reconnect_attempt";

const SOCKET = {
  CONNECTION_EVENT,
  DISCONNECT_EVENT,
  ERROR_EVENT,
  UNAUTHORIZED_EVENT,
  CONNECT_ERROR_EVENT,
  RECONNECT_ATTEMPT_EVENT,
};

/* AUTH SocketEvents */
/* USER AUTH */
const SENT_OTP_EVENT = "sent_otp";
const VERIFY_OTP_EVENT = "verify_otp";
const LOGIN_PROFILE_EVENT = "login_profile";
const CLOUD_PASSWORD_EVENT = "cloud_password";
const FORGET_PASSWORD_EVENT = "forget_password";
const RESET_PASSWORD_EVENT = "reset_password";
const REFRESH_TOKEN_EVENT = "refresh_token";
const DISCONNECT_USER_AUTH_EVENT = "disconnect_user_auth";

const USER_AUTH_SOCKET = {
  SENT_OTP_EVENT,
  VERIFY_OTP_EVENT,
  LOGIN_PROFILE_EVENT,
  CLOUD_PASSWORD_EVENT,
  FORGET_PASSWORD_EVENT,
  RESET_PASSWORD_EVENT,
  REFRESH_TOKEN_EVENT,
  DISCONNECT_USER_AUTH_EVENT,
};

/* ADMIN AUTH */
const ADMIN_LOGIN = "admin-login";
const DISCONNECT_ADMIN_AUTH_EVENT = "disconnect_admin_auth";

const ADMIN_AUTH_SOCKET = {
  ADMIN_LOGIN,
  DISCONNECT_ADMIN_AUTH_EVENT,
};

/* USER Socket Events */

const GET_USER_EVENT = "get_user";
const GET_INBOXES_EVENT = "get_inboxes";
const SEARCH_USER_EVENT = "search_user";
const GET_CONVERSATION_EVENT = "get_conversation";
const CREATE_CONVERSATION_EVENT = "create_conversation";
const SENT_MESSAGE_EVENT = "sent_message";
const LOGOUT_EVENT = "logout";
const DISCONNECT_USER_EVENT = "disconnect_user";
const NEW_INBOX_ARRIVED_EVENT = "new_inbox_arrived";
const RECIEVED_MESSAGE_EVENT = "recieved_message";

const USER_SOCKET = {
  GET_USER_EVENT,
  GET_INBOXES_EVENT,
  SEARCH_USER_EVENT,
  GET_CONVERSATION_EVENT,
  CREATE_CONVERSATION_EVENT,
  SENT_MESSAGE_EVENT,
  LOGOUT_EVENT,
  DISCONNECT_USER_EVENT,
  NEW_INBOX_ARRIVED_EVENT,
  RECIEVED_MESSAGE_EVENT,
};

/* ADMIN Socket Events */
const DISCONNECT_ADMIN_EVENT = "disconnect_admin";
const ADMIN_SOCKET = {
  DISCONNECT_ADMIN_EVENT,
};

export default {
  SOCKET,
  USER_AUTH_SOCKET,
  ADMIN_AUTH_SOCKET,
  USER_SOCKET,
  ADMIN_SOCKET,
};
