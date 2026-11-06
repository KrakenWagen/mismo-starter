import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import { createNotesStore, type NotesState, type NotesStorage, type NotesStore } from "./store.ts";

const StoreContext = createContext<NotesStore | null>(null);

export function NotesProvider({ storage, children }: { storage: NotesStorage; children: ReactNode }) {
  const [store] = useState(() => createNotesStore(storage));
  useEffect(() => store.start(), [store]);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useNotesStore(): NotesStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useNotes must be used inside NotesProvider.");
  return store;
}

export function useNotes(): NotesState & { store: NotesStore } {
  const store = useNotesStore();
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  return useMemo(() => ({ ...state, store }), [state, store]);
}
