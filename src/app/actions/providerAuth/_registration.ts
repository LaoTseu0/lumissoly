"use server";

import { RELATIV_NEXT_API_URL } from "@global/constants";
import logger from "@lib/logger/logger";
import { parseCookies } from "@utils/parseCookies";

/**
 * @Dev Function to register a new user
 * @param userData user register form
 * @returns ok if everything is ok, else throw an error
 */
async function _registration(email: string, password: string): Promise<any> {
  logger.info("[authProvider._registration] Entrypoint");
  if (typeof window !== "undefined") {
    throw new Error("This action can only be called from the server side");
  }
  const { VERCEL_URL } = process.env;
  const API_USER_REGISTER: string = RELATIV_NEXT_API_URL.REGISTRATION;

  try {
    const response = await fetch("https://" + VERCEL_URL + API_USER_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Désactiver explicitement le cache de Next.js
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(
        "Trouble to register a new user" +
          API_USER_REGISTER +
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
    logger.error("Failed to register a new user:", error);
    throw error;
  }
}

export { _registration };
