"use server";

import { COOKIES_KEYS } from "@global/constants";
import { oauth } from "@app/actions/providerAuth";
import { cookies } from "next/headers";
import logger from "@lib/logger/logger";

async function registration(email: string, password: string): Promise<any> {
  logger.info("[authService.registration] Entrypoint");
  const cookieKey = COOKIES_KEYS.sessionToken;

  try {
    const response = await oauth._registration(email, password);
    if (response.cookies)
      cookies().set(cookieKey, response.cookies[cookieKey].value);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { registration };
