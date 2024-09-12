"use server";

import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import logger from "@lib/logger/logger";
import { parseCookies } from "@utils/parseCookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

// JS DOC:
/**
 * @Dev Function to introspect the token
 * @cookie sessionToken is the refresh_token from client cookies.
 * it will be used to get the
 * @returns ok if everything is ok, else throw an error
 */

async function _introspect() {
  logger.info("[authProvider._introspect] Entrypoint");
  if (typeof window !== "undefined") {
    throw new Error("This action can only be called from the server side");
  }
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  const cookieKey = COOKIES_KEYS.sessionToken;
  const cookiesTools = cookies();

  if (!cookiesTools.has(cookieKey)) {
    throw new Error("No token found in the cookies");
  }

  try {
    const refresh_token: RequestCookie = cookiesTools.get(cookieKey)!;
    if (!refresh_token) {
      throw new Error(
        "No refresh_token found, [providerAuth._introspect] Closed."
      );
    }

    const response = await fetch(
      NEXT_PUBLIC_BASE_URL + RELATIV_NEXT_API_URL.INTROSPECT,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionToken=${refresh_token?.value}`,
        },
        // Désactiver explicitement le cache de Next.js
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(
        "[introspect] Trouble to get the token data: " + response.statusText
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
    logger.error("Failed to get the token data:", error);
    throw error;
  }
}

export { _introspect };
