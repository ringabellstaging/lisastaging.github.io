import { NextResponse, type NextRequest } from "next/server";
import {
  languageCookieMaxAge,
  languageCookieName,
  preferredLanguage,
  savedLanguage,
} from "./lib/language-preference";

export function middleware(request: NextRequest) {
  // Only the bare entry point negotiates language. Explicit language URLs,
  // project links, API requests and static assets keep their own destinations.
  if (
    request.nextUrl.pathname !== "/" ||
    !["GET", "HEAD"].includes(request.method)
  )
    return NextResponse.next();

  const cookieValue = request.cookies.get(languageCookieName)?.value;
  const locale = preferredLanguage(
    cookieValue,
    request.headers.get("accept-language"),
  );
  const destination = request.nextUrl.clone();
  destination.pathname = locale === "en" ? "/" : `/${locale}`;
  const response =
    locale === "en"
      ? NextResponse.next()
      : NextResponse.redirect(destination, 307);

  // A visitor's language must never become another visitor's cached redirect.
  // Pages remain prerendered; only the root entry response is personalized.
  response.headers.set("Cache-Control", "private, no-store");
  if (locale !== "en")
    response.headers.set("Vary", "Cookie, Accept-Language");
  if (!savedLanguage(cookieValue)) {
    response.cookies.set(languageCookieName, locale, {
      path: "/",
      maxAge: languageCookieMaxAge,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  }
  return response;
}

export const config = { matcher: ["/"] };
