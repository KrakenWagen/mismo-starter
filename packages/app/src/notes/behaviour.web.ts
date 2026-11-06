// What the notes do only on the web: keyboard shortcuts, and saving before the page goes away.
import { useNav } from "@mismo/core";
import { useEffect } from "react";

import { useNotesStore } from "./provider.tsx";
import { useCreateNote } from "./useCreateNote.ts";

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

export function useSaveOnPageHide() {
  const store = useNotesStore();
  useEffect(() => {
    window.addEventListener("pagehide", store.flush);
    return () => window.removeEventListener("pagehide", store.flush);
  }, [store]);
}
