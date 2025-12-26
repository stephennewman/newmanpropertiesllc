import { NextRequest, NextResponse } from "next/server";

// Valid plaza subdomains
const PLAZA_SUBDOMAINS = ["palmharborplaza", "corallandings", "highlandlakes"];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Extract subdomain (handles both production and localhost)
  // Production: palmharborplaza.newmanpropertiesllc.com
  // Local: palmharborplaza.localhost:3000
  const hostParts = hostname.split(".");
  let subdomain: string | null = null;

  // Check if we have a subdomain
  if (hostParts.length > 1) {
    // Handle localhost:port case
    if (hostname.includes("localhost")) {
      subdomain = hostParts[0];
    } else if (hostParts.length >= 3) {
      // Production: subdomain.domain.tld
      subdomain = hostParts[0];
    }
  }

  // Skip for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If valid plaza subdomain, rewrite to the sites folder
  if (subdomain && PLAZA_SUBDOMAINS.includes(subdomain)) {
    const url = request.nextUrl.clone();
    url.pathname = `/sites/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Otherwise, serve the main site
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

