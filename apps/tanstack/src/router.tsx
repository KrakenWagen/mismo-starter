import { createRouter } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { routeTree } from "./routeTree.gen.ts";

/**
 * Whether the browser animated the current history change itself. Listening here, before the router
 * exists, runs this before the router's own popstate listener, which starts the transition.
 */
let browserAnimated = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", (event) => {
    browserAnimated = (event as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition === true;
    setTimeout(() => (browserAnimated = false));
  });
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    // Page transitions: the shared layout's <ViewTransition> isn't enough under this router.
    defaultViewTransition: {
      // None after a swipe that the browser animated itself, like a swipe back in Safari. Even with
      // no animation, a transition would flash the page being left.
      types: () => (browserAnimated ? false : []),
    },
    defaultNotFoundComponent: () => <p>Page not found.</p>,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
