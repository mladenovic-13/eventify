import { eventRouter } from "@/server/api/routers/event";
import { createTRPCRouter } from "@/server/api/trpc";

import { billingRouter } from "./routers/billing";
import { s3Router } from "./routers/s3";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  s3: s3Router,
  billing: billingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
