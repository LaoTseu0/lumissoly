import { OAUTH_GRANT_TYPES } from "@global/constants";
import logger from "@lib/logger/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Secret key to secure the internal API
const API_SECRET = process.env.INTERNAL_API_SECRET;

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const URL = process.env.OAUTH_KEYCLOAK_URL;
  const REALM = process.env.OAUTH_KEYCLOAK_REALM;
  const CLIENT_ADMIN_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ADMIN_ID;
  const CLIENT_ADMIN_SECRET = process.env.OAUTH_KEYCLOAK_CLIENT_ADMIN_SECRET;
  const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

  // Vérifiez le secret API interne
  const providedSecret = req.headers.get("x-api-secret");
  if (providedSecret !== INTERNAL_API_SECRET) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const getAdminTokenURL = `${URL}/realms/${REALM}/protocol/openid-connect/token`;

    const AdminTokenParams = new URLSearchParams({
      grant_type: OAUTH_GRANT_TYPES.CLIENT_CREDENTIALS,
      client_id: CLIENT_ADMIN_ID,
      client_secret: CLIENT_ADMIN_SECRET,
    } as Record<string, string>);

    const result = await fetch(getAdminTokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: AdminTokenParams,
    });
    if (!result.ok) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const data = await result.json();
    if (!data.access_token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const response = NextResponse.json(
      { token: data.access_token },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to get admin token:", error);
    return new NextResponse(`Server Error during admin authentication`, {
      status: 500,
    });
  }
}
