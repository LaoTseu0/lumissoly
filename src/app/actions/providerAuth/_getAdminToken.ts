"use server";

import { RELATIV_NEXT_API_URL } from "@global/constants";
import logger from "@lib/logger/logger";

async function _getAdminToken(apiSecret: string): Promise<any> {
  logger.info("[authProvider._getAdminToken] Entrypoint");
  if (typeof window !== "undefined") {
    throw new Error("This action can only be called from the server side");
  }
  const { VERCEL_URL } = process.env;
  const API_ADMIN_TOKEN: string = RELATIV_NEXT_API_URL.GET_ADMIN_TOKEN;

  logger.info(
    `[authProvider._getAdminToken] Attempting to get an admin token for client-admin`
  );
  try {
    const response = await fetch(VERCEL_URL + API_ADMIN_TOKEN, {
      method: "GET",
      headers: {
        "x-api-Secret": apiSecret!,
      },
      cache: "no-store",
    });
    logger.info("[authProvider._getAdminToken] Token received");
    return await response.json();
  } catch (error) {
    logger.error("Failed to get admin token:", error);
    throw error;
  }
}

export { _getAdminToken };
