import { useNav } from "@mismo/core";

import { useNotesStore } from "../notes/provider.tsx";

/** Creates an empty note and opens it. */
export function useCreateNote() {
  const store = useNotesStore();
  const nav = useNav();
  return () => nav.go({ href: "/notes/[id]", params: { id: store.create() } });
}
