import {
  COOKIES_KEYS,
  OAUTH_GRANT_TYPES,
  RELATIV_NEXT_API_URL,
} from "@global/constants";
import { NextRequest, NextResponse } from "next/server";
import logger from "@lib/logger/logger";
import { oauth } from "@app/actions/providerAuth";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const URL = process.env.OAUTH_KEYCLOAK_URL;
  const REALM = process.env.OAUTH_KEYCLOAK_REALM;
  const CLIENT_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_KEYCLOAK_CLIENT_SECRET;

  try {
    const cookies = req.cookies;
    const refresh_token = cookies.get(COOKIES_KEYS.sessionToken);

    if (!refresh_token || refresh_token.value === "") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const body = new URLSearchParams({
      refresh_token: refresh_token.value,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    } as Record<string, string>);

    const keycloakUrl = `${URL}/realms/${REALM}/protocol/openid-connect/logout`;
    const keycloakResponse = await fetch(keycloakUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    if (!keycloakResponse.ok) {
      const errorData = await keycloakResponse.text();
      console.error("[API oauth/logout] Keycloak error response:", errorData);
      return new NextResponse(`Logout failed: ${errorData}`, {
        status: keycloakResponse.status,
      });
    }

    logger.info("[API oauth/logout] Successfully close user session");
    const response = NextResponse.json(
      { message: "Session closed" },
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    console.error(
      `Detailed error in ${RELATIV_NEXT_API_URL.LOGOUT} endpoint:`,
      error
    );
    return new NextResponse(
      `Error during logout server process: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
