"use server";
import { RELATIV_NEXT_API_URL } from "@global/constants";
import logger from "@lib/logger/logger";
import { parseCookies } from "@utils/parseCookies";
import { FormatedResponse } from ".";

/**
 * @Dev Function to authenticate the user
 * @param email user email
 * @param password user password
 * @returns ok if everything is ok, else throw an error
 */
async function _authentication(
  email: string,
  password: string
): Promise<FormatedResponse> {
  logger.info("[authProvider._authentication] Entrypoint");
  if (typeof window !== "undefined") {
    throw new Error("This action can only be called from the server side");
  }
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  const API_AUTHENTICATE: string = RELATIV_NEXT_API_URL.AUTHENTICATE;

  try {
    const response = await fetch(NEXT_PUBLIC_BASE_URL + API_AUTHENTICATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Desactivation du cache
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      // Désactiver explicitement le cache de Next.js
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(
        "Trouble to communicate with " +
          API_AUTHENTICATE +
          " endpoint. Message: " +
          response.statusText
      );
    }

    // data
    const formatedResponse: FormatedResponse = await response.json();
    // status
    formatedResponse.ok = response.ok;
    // cookies
    const cookies = response.headers.getSetCookie() ?? [];
    if (cookies.length > 0) formatedResponse.cookies = parseCookies(cookies);
    // forward
    return formatedResponse;
  } catch (error) {
    logger.error("Failed to authenticate user:", error);
    throw error;
  }
}

export { _authentication };
