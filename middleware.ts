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
  key: process.env.ARCJET_KEY!,
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

// Clerk middleware for authentication with proper syntax
const clerk = clerkMiddleware(async (auth, req) => {
  // Protect routes if needed
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  return NextResponse.next();
});

// Chain middlewares: ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

// Middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
