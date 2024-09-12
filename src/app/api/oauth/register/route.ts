import { COOKIES_KEYS, OAUTH_GRANT_TYPES } from "@global/constants";
import logger from "@lib/logger/logger";
import { oauth } from "@app/actions/providerAuth";
import { serviceOAuth } from "@app/actions/serviceOAuth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

/**
 * @Dev This handle work with keycloack client_credentials flow
 * So it use email & password to create a user.
 * Keycloak response with a 201 status code if the user is created
 * but empty body.
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const URL = process.env.OAUTH_KEYCLOAK_URL;
  const REALM = process.env.OAUTH_KEYCLOAK_REALM;
  const CLIENT_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_KEYCLOAK_CLIENT_SECRET;
  const CLIENT_ADMIN_ID = process.env.OAUTH_KEYCLOAK_CLIENT_ADMIN_ID;
  const CLIENT_ADMIN_SECRET = process.env.OAUTH_KEYCLOAK_CLIENT_ADMIN_SECRET;
  const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

  try {
    const { email, password } = await req.json();

    // Step1 : Get the admin token
    const accessTokenAdmin = await oauth._getAdminToken(INTERNAL_API_SECRET!);

    logger.info(`[API: oauth/register] Access token claimed by admin`);

    logger.info(
      `[API: oauth/register] Attempting to register user from client-admin: ${email}`
    );
    // Step2 : Register the user

    const registerUserURL = `${URL}/admin/realms/${REALM}/users`;
    // keycloak always requires attributes to be an array
    const emailHashArray = [createHash("sha256").update(email).digest("hex")];

    const registerBody = {
      username: "Default",
      email,
      enabled: true,
      emailVerified: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
      attributes: {
        emailHash: emailHashArray,
      },
    };

    const registrationResponse = await fetch(registerUserURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenAdmin.token}`,
      },
      body: JSON.stringify(registerBody),
    });

    if (!registrationResponse.ok) {
      const errorData = await registrationResponse.text();
      logger.error("Keycloak error response:", errorData);
      return new NextResponse(`User registration failed: ${errorData}`, {
        status: registrationResponse.status,
      });
    }

    logger.info(`[API: oauth/register] User registered successfully`);

    const response = NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    logger.error("Detailed error in registration process:", error);
    return new NextResponse(`Error during the registration process`, {
      status: 500,
    });
  }
}
