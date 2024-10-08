import { _introspect } from "./_introspect";
import { _refreshToken } from "./_refreshToken";
import { _authentication } from "./_authentication";
import { _registration } from "./_registration";
import { _logout } from "./_logout";
import { _getAdminToken } from "./_getAdminToken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface FormatedResponse {
  message: string;
  ok: boolean;
  cookies?: any;
}

interface OauthProvider {
  _introspect: () => Promise<FormatedResponse>;
  _refreshToken: (_refresh_token?: RequestCookie) => Promise<FormatedResponse>;
  _authentication: (
    email: string,
    password: string
  ) => Promise<FormatedResponse>;
  _registration: (email: string, password: string) => Promise<FormatedResponse>;
  _logout: () => Promise<FormatedResponse>;
  _getAdminToken: (apiSecret: string) => Promise<{ token: string }>;
}

const oauth: OauthProvider = {
  _introspect,
  _refreshToken,
  _authentication,
  _registration,
  _logout,
  _getAdminToken,
};
export type { FormatedResponse };
export { oauth };
