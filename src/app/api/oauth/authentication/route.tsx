import { COOKIES_KEYS, OAUTH_GRANT_TYPES } from "@global/constants";
import { NextRequest, NextResponse } from "next/server";
import logger from "@lib/logger/logger";

// explicit dynamic declaration
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const URL = process.env.OAUTH_KEYCLOAK_URL;
  const REALM = process.env.OAUTH_KEYCLOAK_REALM;
  const CLIENT_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_KEYCLOAK_CLIENT_SECRET;

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    logger.info(`Attempting to get access_token of user: ${email}`);

    const keycloakUrl = `${URL}/realms/${REALM}/protocol/openid-connect/token`;

    const body = new URLSearchParams({
      grant_type: OAUTH_GRANT_TYPES.ROPC,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: email,
      password: password,
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
      return new NextResponse(`Authentication failed: ${errorData}`, {
        status: keycloakResponse.status,
      });
    }

    const token = await keycloakResponse.json();
    logger.info("User session Successfully opened");
    const response = NextResponse.json(
      { message: "Session opened" },
      { status: 200 }
    );

    response.cookies.set(COOKIES_KEYS.sessionToken, token.refresh_token);
    return response;
  } catch (error: any) {
    console.error("Detailed error in GET_TOKEN endpoint:", error);
    return new NextResponse(
      `Error during user authentication server process: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
