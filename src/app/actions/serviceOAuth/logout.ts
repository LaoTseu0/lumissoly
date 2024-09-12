"use server";

import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import { oauth } from "@app/actions/providerAuth";
import { cookies } from "next/headers";
import logger from "@lib/logger/logger";

async function logout() {
  logger.info("[oauthService.logout] Entrypoint");

  await oauth._logout().then((response) => {
    if (response.ok) {
      cookies().delete(COOKIES_KEYS.sessionToken);
    }
  });
}

export { logout };
