import { usePathname } from "@mismo/core";
import { useEffect } from "react";

import { useNotesStore } from "./provider.tsx";

/** Drops notes nothing was written in once you leave them, so "New" doesn't clutter the list. */
export function useDropEmptyNotes() {
  const store = useNotesStore();
  const pathname = usePathname();

  useEffect(() => {
    store.pruneEmpty(pathname.match(/^\/notes\/(.+)$/)?.[1] ?? null);
  }, [store, pathname]);
}
