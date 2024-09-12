"use server";

import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import logger from "@lib/logger/logger";
import { parseCookies } from "@utils/parseCookies";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

// JS DOC:
/**
 * @Dev Function to _logout the token
 * @param token OAuth access_token
 * @returns ok if everything is ok, else throw an error
 */

async function _logout() {
  logger.info("[authProvider._logout] Entrypoint");
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

    const response = await fetch(
      NEXT_PUBLIC_BASE_URL + RELATIV_NEXT_API_URL.LOGOUT,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Desactiation du cache
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          Cookie: `sessionToken=${refresh_token?.value}`,
        },
        // Désactiver explicitement le cache de Next.js
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        "[authProvider._logout] Trouble to close the session: " +
          response.statusText
      );
    }
    // data
    const formatedResponse = await response.json();
    // status
    formatedResponse.ok = response.ok;
    // forward
    return formatedResponse;
  } catch (error) {
    logger.error("Failed to close the session:", error);
    throw error;
  }
}

export { _logout };
