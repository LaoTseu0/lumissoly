"use server";

import { COOKIES_KEYS } from "@global/constants";
import { oauth } from "@app/actions/providerAuth";
import logger from "@lib/logger/logger";
import { cookies } from "next/headers";

async function connectUser(email: string, password: string): Promise<any> {
  logger.info("[authService.connectUser] Entrypoint");
  const cookieKey = COOKIES_KEYS.sessionToken;

  try {
    const response = await oauth._authentication(email, password);
    if (response.cookies)
      cookies().set(cookieKey, response.cookies[cookieKey].value);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { connectUser };
