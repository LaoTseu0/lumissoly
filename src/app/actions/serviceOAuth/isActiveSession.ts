"use server";
import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import { oauth } from "@app/actions/providerAuth";
import { cookies } from "next/headers";
import logger from "@lib/logger/logger";

/**
 * @Dev Function to validate OAuth, called by the middleware
 * @param refreshToken OAuth token
 * @returns true | false
 */
async function isActiveSession(): Promise<boolean> {
  logger.info("[authService.isActiveSession] Entrypoint");

  const response = await oauth._refreshToken();

  return response.ok;
}

export { isActiveSession };
