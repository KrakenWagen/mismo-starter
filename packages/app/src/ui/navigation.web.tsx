// The web's page transitions. The animations are in transitions.css.
import { pathOf, useNav, usePathname, type BackLinkProps } from "@mismo/core";
import { useLayoutEffect, useRef } from "react";
import { html } from "@mismo/ui";

/**
 * Tells transitions.css which way the app is moving. It runs as the new page goes in, and the
 * animations start after that.
 */
export function useNavDirection(isDetail: (path: string) => boolean) {
  const path = usePathname();
  const previous = useRef(path);

  useLayoutEffect(() => {
    const from = isDetail(previous.current);
    const to = isDetail(path);
    document.documentElement.dataset.nav = from === to ? (from ? "same" : "fade") : to ? "forward" : "back";
    previous.current = path;
  }, [path, isDetail]);
}

/**
 * Goes back inside a view transition, which has to start first. Next.js applies a back navigation
 * right away, too soon for one to start by itself. TanStack Start's own takes over from this one.
 */
function goBackAnimated(back: () => void) {
  if (!document.startViewTransition) return back();
  const { ready } = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        window.addEventListener("popstate", () => setTimeout(resolve), { once: true });
        back();
      }),
  );
  ready.catch(() => {}); // A skipped transition isn't an error.
}

/** Like `BackLink` from mismo, with a transition. A real link, so a modified click opens a new tab. */
export function WebBackLink({ fallback, label, children }: BackLinkProps) {
  const nav = useNav();
  return (
    <html.a
      aria-label={label}
      href={pathOf(fallback)}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        if (nav.canGoBack()) goBackAnimated(nav.back);
        else nav.go(fallback);
      }}
    >
      {children}
    </html.a>
  );
}
