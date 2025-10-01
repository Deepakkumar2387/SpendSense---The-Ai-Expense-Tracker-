import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet from "@arcjet/next";
import { createMiddleware, detectBot, shield } from "@arcjet/next";

// Match routes that need authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Initialize Arcjet middleware
const arcjetMiddleware = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", // Use "DRY_RUN" to only log bots
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest
      ],
    }),
  ],
});

// Initialize Clerk middleware
const clerkMW = clerkMiddleware(async (authFn, req) => {
  const { userId } = await authFn();

  if (isProtectedRoute(req) && !userId) {
    const { redirectToSignIn } = await authFn();
    return redirectToSignIn();
  }
});

// Compose both middlewares
export default createMiddleware(arcjetMiddleware, clerkMW);

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
