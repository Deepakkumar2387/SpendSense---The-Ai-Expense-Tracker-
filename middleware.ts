import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes for Clerk
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// ArcJet middleware for bot detection and security
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest or webhooks
      ],
    }),
  ],
});

// Clerk middleware for authentication
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the route is protected and user is not signed in, redirect
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Chain middlewares: ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

// Middleware matcher
export const config = {
  matcher: [
    // Protected pages
    "/dashboard/:path*",
    "/account/:path*",
    "/transaction/:path*",
    // API routes
    "/api/:path*",
    "/trpc/:path*",
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
