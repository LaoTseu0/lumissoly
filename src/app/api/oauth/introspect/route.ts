import { COOKIES_KEYS, OAUTH_GRANT_TYPES } from "@global/constants";
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

    // TODO: Deplacé cette appel dans le service OAuth
    // La route introspect devrait n'utilisé que le access_token
    // fourni par le provider Auth.
    const tokens = await oauth._refreshToken(refresh_token);

    if (!tokens.cookies.accessToken || tokens.cookies.accessToken === "") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const body = new URLSearchParams({
      token: tokens.cookies.accessToken.value,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    } as Record<string, string>);

    const keycloakUrl = `${URL}/realms/${REALM}/protocol/openid-connect/token/introspect`;
    const keycloakResponse = await fetch(keycloakUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });

    if (!keycloakResponse.ok) {
      const errorData = await keycloakResponse.text();
      console.error("Keycloak error response:", errorData);
      return new NextResponse(`Authentication failed: ${errorData}`, {
        status: keycloakResponse.status,
      });
    }

    const parsedData = await keycloakResponse.json();
    const { email, username, emailHash, active } = parsedData;
    // keycloak return active as boolean for session status
    if (!active) {
      return new NextResponse("Session closed", {
        status: 401,
      });
    }

    logger.info("[API oauth/introspect] Successfully retrieved user Data");
    const response = NextResponse.json({ email, username }, { status: 200 });
    response.cookies.set(COOKIES_KEYS.hashMail, emailHash);
    return response;
  } catch (error: any) {
    console.error("Detailed error in GET_TOKEN endpoint:", error);
    return new NextResponse(
      `Error during user data recovery: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
