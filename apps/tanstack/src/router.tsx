import { createRouter } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { routeTree } from "./routeTree.gen.ts";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    // Page transitions: the shared layout's <ViewTransition> isn't enough under this router.
    defaultViewTransition: true,
    defaultNotFoundComponent: () => <p>Page not found.</p>,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
