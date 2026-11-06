// The web's parts of the shell: scrolling, keyboard shortcuts and the page title.
import { useNav, usePathname } from "@mismo/core";
import { useEffect, type ReactNode } from "react";
import { css, html } from "react-strict-dom";

import { useNotes } from "../notes/provider.tsx";
import { useCreateNote } from "./useCreateNote.ts";

export function WebScroll({ children }: { children: ReactNode }) {
  return <html.div style={styles.scroll}>{children}</html.div>;
}

export function WebEditorFrame({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/** The list exists twice in the page, and only one copy is visible. */
function focusSearch() {
  const inputs = document.querySelectorAll<HTMLInputElement>('input[type="search"]');
  [...inputs].find((input) => input.offsetParent !== null)?.focus();
}

export function useShortcuts() {
  const createNote = useCreateNote();
  const nav = useNav();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isTyping(event.target)) {
        (event.target as HTMLElement).blur();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;

      if (event.key === "n") {
        event.preventDefault();
        createNote();
      } else if (event.key === "/") {
        event.preventDefault();
        focusSearch();
      } else if (event.key === "?") {
        event.preventDefault();
        nav.go("/shortcuts");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [createNote, nav]);
}

/** Shows the open note's title in the browser tab, and saves before the page goes away. */
export function usePageLifecycle() {
  const { notes, store } = useNotes();
  const pathname = usePathname();
  const id = pathname.match(/^\/notes\/(.+)$/)?.[1];
  const title = id ? notes.find((note) => note.id === id)?.title.trim() : undefined;

  useEffect(() => {
    if (!id) return;
    const wanted = title || "New note";
    const previous = document.title;
    document.title = wanted;
    // A router can write its own title just after this runs, so keep correcting it.
    const observer = new MutationObserver(() => {
      if (window.location.pathname === pathname && document.title !== wanted) document.title = wanted;
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => {
      observer.disconnect();
      // A router won't rewrite a title it thinks is unchanged, so put back the one it set.
      if (document.title === wanted) document.title = previous;
    };
  }, [id, title, pathname]);

  useEffect(() => {
    window.addEventListener("pagehide", store.flush);
    return () => window.removeEventListener("pagehide", store.flush);
  }, [store]);
}

export const useWebLayout = () => null;

const styles = css.create({
  scroll: { flex: 1, minHeight: 0, overflowY: "auto" },
  truncate: { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
});

export const webTruncate = styles.truncate;
