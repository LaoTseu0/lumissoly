import { COOKIES_KEYS, OAUTH_GRANT_TYPES } from "@global/constants";
import { NextRequest, NextResponse } from "next/server";
import logger from "@lib/logger/logger";

/**
 * @Dev This handle work with keycloack Refresh Token flow
 * So we need only the refresh token here.
 * @param req
 * @returns
 */
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

    if (!refresh_token) {
      return new NextResponse("Token are required", {
        status: 400,
      });
    }

    const keycloakUrl = `${URL}/realms/${REALM}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: OAUTH_GRANT_TYPES.REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refresh_token.value,
    } as Record<string, string>);

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
      return new NextResponse(`Refresh failed: ${errorData}`, {
        status: keycloakResponse.status,
      });
    }

    const tokens = await keycloakResponse.json();

    const response = NextResponse.json(
      { message: "Session is active" },
      { status: 200 }
    );
    // ajout du cookie accessToken pour les appel de api/introspect
    response.cookies.set({ name: "sessionToken", value: tokens.refresh_token });
    response.cookies.set({ name: "accessToken", value: tokens.access_token });

    return response;
  } catch (error: any) {
    console.error("Detailed error in GET_TOKEN endpoint:", error);
    return new NextResponse(
      `Error during refresh server process: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
