import { COOKIES_KEYS } from "@global/constants";
import { pathTo_Menu } from "@global/navigation";
import logger from "@lib/logger/logger";
import { serviceOAuth } from "@app/actions/serviceOAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// !Important: middleware fetch url works only with absolute url !!!!!
/**
 * @Dev Middleware only to check if the user has a valid session
 * to navigate on the protected routes
 */
export async function middleware(request: NextRequest) {
  const { NEXT_PUBLIC_BASE_URL } = process.env;
  const redirectURL = `${NEXT_PUBLIC_BASE_URL}${pathTo_Menu()}`;
  const sessionToken: any = cookies().get(COOKIES_KEYS.sessionToken);
  if (!sessionToken) return NextResponse.redirect(redirectURL);

  // TODO: Récupérer les user data, pour set un cookie avec le nouveau fragment

  // SSS
  // Shard 1 : hash(email).hexToInt() : cookie (session) // version int utilisé par SSS
  const isActive = await serviceOAuth.isActiveSession();

  logger.info("[Next: Middleware] isActiveSession ");

  if (isActive) {
    const response = NextResponse.next();
    return response;
  } else {
    // suppression du cookie si la session n'est pas active
    const response = NextResponse.redirect(redirectURL);
    response.cookies.delete(COOKIES_KEYS.sessionToken);
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
