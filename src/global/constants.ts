export const RELATIV_NEXT_API_URL = {
  AUTHENTICATE: "/api/oauth/authentication",
  REFRESH_TOKEN: "/api/oauth/refresh",
  INTROSPECT: "/api/oauth/introspect",
  LOGOUT: "/api/oauth/logout",
  REGISTRATION: "/api/oauth/register",
  GET_USER_OAUTH_DATA: "/api/user/oauthdata",
  GET_ADMIN_TOKEN: "/api/oauth/admin",
};

export const OAUTH_GRANT_TYPES = {
  ROPC: "password",
  CLIENT_CREDENTIALS: "client_credentials",
  REFRESH_TOKEN: "refresh_token",
};

export const COOKIES_KEYS = {
  sessionToken: "sessionToken",
  hashMail: "hashMail",
};

export const COLORS = {
  primary: "#cba660",
  secondary: "#7e1a24",
};

export const PATH_SCHEMA = {
  everywhere: "/*",
};
