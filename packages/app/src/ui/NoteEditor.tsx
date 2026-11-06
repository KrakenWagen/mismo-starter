// The editor. Every change saves by itself.
import { BackLink, useNav } from "@mismo/core";
import { css, html } from "react-strict-dom";

import { useNotes } from "../notes/provider.tsx";
import { formatEdited } from "../notes/store.ts";
import { useChrome } from "./chrome.tsx";
import { Button, Muted } from "./primitives.tsx";
import { colors } from "./tokens.css.ts";

/** Pin and delete: above the note on the web, in the header on native. */
export function NoteActions({ id }: { id: string }) {
  const { notes, store } = useNotes();
  const { platform } = useChrome();
  const nav = useNav();
  const note = notes.find((candidate) => candidate.id === id);
  if (!note) return null;

  return (
    <html.div style={styles.actions}>
      <Button variant={note.pinned ? "active" : "plain"} onClick={() => store.togglePin(id)}>
        {note.pinned ? "Pinned" : "Pin"}
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          store.remove(id);
          if (platform === "native" && nav.canGoBack()) nav.back();
          else nav.replace("/");
        }}
      >
        Delete
      </Button>
    </html.div>
  );
}

export function NoteEditor({ id }: { id: string }) {
  const { ready, notes, saving, store } = useNotes();
  const { platform, EditorFrame } = useChrome();
  const note = notes.find((candidate) => candidate.id === id);

  if (!ready) return <html.div style={styles.placeholder} />;
  if (!note) {
    return (
      <html.main style={styles.missing}>
        <Muted>This note doesn't exist, or it was deleted.</Muted>
        <BackLink fallback="/" label="Back to notes">
          <html.span style={styles.link}>Back to notes</html.span>
        </BackLink>
      </html.main>
    );
  }

  const isEmpty = !note.title && !note.body;

  return (
    <EditorFrame>
      <html.main style={styles.editor}>
        {platform === "web" ? (
          <html.div style={styles.toolbar}>
            <html.div style={styles.back}>
              <BackLink fallback="/" label="Back to notes">
                <html.span style={styles.link}>‹ Notes</html.span>
              </BackLink>
            </html.div>
            <NoteActions id={id} />
          </html.div>
        ) : null}
        <html.div style={styles.column}>
          <html.input
            aria-label="Title"
            autoFocus={isEmpty}
            onInput={(event: InputEvent) => store.update(id, { title: event.target.value })}
            placeholder="Title"
            style={styles.title}
            value={note.title}
          />
          <html.span style={styles.meta}>
            {formatEdited(note.updatedAt)}  ·  {saving ? "Saving…" : "Saved"}
          </html.span>
          <html.textarea
            aria-label="Note"
            onInput={(event: InputEvent) => store.update(id, { body: event.target.value })}
            placeholder="Start writing…"
            style={styles.body}
            value={note.body}
          />
        </html.div>
      </html.main>
    </EditorFrame>
  );
}

type InputEvent = { target: { value: string } };

const styles = css.create({
  placeholder: { flex: 1 },
  missing: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 48 },
  link: { fontSize: 15, fontWeight: 500, color: colors.accent },
  editor: { display: "flex", flexDirection: "column", flex: 1, minHeight: 0 },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 46,
    paddingBlock: 6,
    paddingInline: 12,
  },
  back: { display: { default: "flex", "@media (min-width: 840px)": "none" }, paddingInline: 4 },
  actions: { display: "flex", flexDirection: "row", alignItems: "center", gap: 4, marginInlineStart: "auto" },
  column: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    width: "100%",
    maxWidth: 720,
    boxSizing: "border-box",
    marginInline: "auto",
    paddingBlock: { default: 8, "@media (min-width: 840px)": 24 },
    paddingInline: { default: 20, "@media (min-width: 840px)": 32 },
  },
  title: {
    width: "100%",
    padding: 0,
    fontSize: { default: 26, "@media (min-width: 840px)": 32 },
    fontWeight: 700,
    letterSpacing: -0.5,
    color: colors.text,
    backgroundColor: "transparent",
    borderWidth: 0,
    "::placeholder": { color: colors.faint },
  },
  meta: { marginTop: 6, marginBottom: 20, fontSize: 13, color: colors.muted },
  body: {
    flex: 1,
    width: "100%",
    padding: 0,
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.text,
    backgroundColor: "transparent",
    borderWidth: 0,
    "::placeholder": { color: colors.faint },
  },
});
