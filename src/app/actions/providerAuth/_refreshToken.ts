"use server";

import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import { serviceOAuth } from "@app/actions/serviceOAuth";
import { cookies } from "next/headers";
import logger from "@lib/logger/logger";
import { parseCookies } from "@utils/parseCookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @Dev Function to refresh the token
 * @param refresh_token token to be refreshed
 * @returns new tokens
 */

async function _refreshToken(_refresh_token?: RequestCookie) {
  logger.info("[authProvider._refreshToken] Entrypoint");
  if (typeof window !== "undefined") {
    throw new Error("This action can only be called from the server side");
  }
  const { VERCEL_URL } = process.env;
  const cookieKey = COOKIES_KEYS.sessionToken;
  const cookiesTools = cookies();
  let refresh_token;

  if (!cookiesTools.has(cookieKey) && !_refresh_token) {
    throw new Error("No refresh_token found");
  } else if (cookiesTools.has(cookieKey)) {
    refresh_token = cookiesTools.get(cookieKey);
  } else {
    refresh_token = _refresh_token;
  }

  try {
    const response = await fetch(
      "https://" + VERCEL_URL + RELATIV_NEXT_API_URL.REFRESH_TOKEN,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${cookieKey}=${refresh_token?.value}`,
        },
        // Désactiver explicitement le cache de Next.js
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(
        "Trouble to communicate with " +
          RELATIV_NEXT_API_URL.REFRESH_TOKEN +
          " endpoint. Message: " +
          response.statusText
      );
    }
    // data
    const formatedResponse = await response.json();
    // status
    formatedResponse.ok = response.ok;
    // cookies
    const cookies = response.headers.getSetCookie() ?? [];
    if (cookies.length > 0) formatedResponse.cookies = parseCookies(cookies);
    // forward
    return formatedResponse;
  } catch (error) {
    logger.error("Failed to refresh the token:", error);
    throw error;
  }
}

export { _refreshToken };
