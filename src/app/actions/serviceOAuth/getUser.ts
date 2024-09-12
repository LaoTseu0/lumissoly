"use server";

import { COOKIES_KEYS, RELATIV_NEXT_API_URL } from "@global/constants";
import { oauth } from "@app/actions/providerAuth";
import { cookies } from "next/headers";
import logger from "@lib/logger/logger";

async function getUser() {
  logger.info("[oauthService.getUser] Entrypoint");

  const cookieKeyHashMail = COOKIES_KEYS.hashMail;

  // TODO: implémenté l'échange de token ici (oauth._refreshToken)

  const response = await oauth._introspect();

  if (response.cookies) {
    cookies().set(cookieKeyHashMail, response.cookies[cookieKeyHashMail].value);
  }

  return response;
}

export { getUser };
