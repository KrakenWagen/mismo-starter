import type { NotesStorage } from "./store.ts";

const KEY = "mismo-starter-notes";

export const webStorage: NotesStorage = {
  load: async () => localStorage.getItem(KEY),
  save: (value) => localStorage.setItem(KEY, value),
  subscribe(listener) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  },
};
