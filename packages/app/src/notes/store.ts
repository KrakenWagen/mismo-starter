// The app's state and actions, with no UI. Each platform's layout passes in where notes are saved.
import { sampleNotes } from "./samples.ts";

export type Note = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  updatedAt: number;
};

export type NotesStorage = {
  load(): Promise<string | null>;
  save(value: string): void;
  /** Calls back when another tab changes the notes. */
  subscribe?(listener: () => void): () => void;
};

export type NotesState = {
  /** False until saved notes have loaded, which is always the case on the server. */
  ready: boolean;
  notes: Note[];
  query: string;
  saving: boolean;
  /** The last deleted note, while it can still be restored. */
  removed: Note | null;
  lastCreatedId: string | null;
};

const INITIAL: NotesState = {
  ready: false,
  notes: [],
  query: "",
  saving: false,
  removed: null,
  lastCreatedId: null,
};

const SAVE_DELAY_MS = 300;
const UNDO_MS = 6000;

export type NotesStore = ReturnType<typeof createNotesStore>;

export function createNotesStore(storage: NotesStorage) {
  let state = INITIAL;
  let loadStarted = false;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;
  let undoTimer: ReturnType<typeof setTimeout> | undefined;
  const listeners = new Set<() => void>();

  function set(patch: Partial<NotesState>) {
    state = { ...state, ...patch };
    for (const listener of listeners) listener();
  }

  function setNotes(notes: Note[], patch: Partial<NotesState> = {}) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, SAVE_DELAY_MS);
    set({ ...patch, notes, saving: true });
  }

  function flush() {
    clearTimeout(saveTimer);
    if (!state.saving) return;
    storage.save(JSON.stringify(state.notes));
    set({ saving: false });
  }

  async function read() {
    const notes = parse(await storage.load()) ?? sampleNotes(Date.now());
    set({ ready: true, notes });
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => state,
    getServerSnapshot: () => INITIAL,

    /** Loads saved notes once, and keeps up with other tabs. */
    start() {
      if (!loadStarted) {
        loadStarted = true;
        void read();
      }
      return storage.subscribe?.(() => void read());
    },
    flush,

    setQuery: (query: string) => set({ query }),

    create() {
      const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      const note: Note = { id, title: "", body: "", pinned: false, updatedAt: Date.now() };
      setNotes([note, ...state.notes], { query: "", lastCreatedId: id });
      return id;
    },

    update(id: string, patch: Partial<Pick<Note, "title" | "body">>) {
      setNotes(state.notes.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note)));
    },

    togglePin(id: string) {
      setNotes(state.notes.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note)));
    },

    remove(id: string) {
      const removed = state.notes.find((note) => note.id === id) ?? null;
      setNotes(
        state.notes.filter((note) => note.id !== id),
        { removed },
      );
      clearTimeout(undoTimer);
      undoTimer = setTimeout(() => set({ removed: null }), UNDO_MS);
    },

    undoRemove() {
      clearTimeout(undoTimer);
      if (state.removed) setNotes([state.removed, ...state.notes], { removed: null });
    },

    /** Drops notes nothing was written in, so opening "new note" and leaving doesn't clutter the list. */
    pruneEmpty(keepId: string | null) {
      const kept = state.notes.filter((note) => note.id === keepId || note.title.trim() || note.body.trim());
      if (kept.length !== state.notes.length) setNotes(kept);
    },

    resetSamples() {
      setNotes(sampleNotes(Date.now()), { query: "", removed: null });
      flush();
    },
  };
}

function parse(saved: string | null): Note[] | null {
  if (!saved) return null;
  try {
    const notes: unknown = JSON.parse(saved);
    return Array.isArray(notes) ? (notes as Note[]) : null;
  } catch {
    return null;
  }
}

/** Notes matching a search, newest first and split into pinned and the rest. */
export function visibleNotes(notes: Note[], query: string) {
  const search = query.trim().toLowerCase();
  const matches = notes
    .filter((note) => !search || `${note.title}\n${note.body}`.toLowerCase().includes(search))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  return { pinned: matches.filter((note) => note.pinned), others: matches.filter((note) => !note.pinned) };
}

export function formatEdited(timestamp: number, now = Date.now()) {
  const minutes = Math.floor((now - timestamp) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  if (hours < 48) return "Yesterday";
  return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
