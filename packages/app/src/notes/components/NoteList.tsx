// The list of notes: the sidebar on wide screens, and the home screen on narrow ones.
import { Link, usePathname } from "@mismo/core";
import { css, html } from "react-strict-dom";

import { useNotes } from "../provider.tsx";
import { formatEdited, visibleNotes, type Note } from "../store.ts";
import { useChrome } from "../../ui/chrome.tsx";
import { Button, useEntered } from "../../ui/primitives.tsx";
import { colors } from "../../ui/tokens.css.ts";
import { useCreateNote } from "../useCreateNote.ts";

export function NoteList({ variant }: { variant: "page" | "sidebar" }) {
  const { ready, notes, query, store } = useNotes();
  const { Scroll, navLinks, platform } = useChrome();
  const createNote = useCreateNote();
  const { pinned, others } = visibleNotes(notes, query);
  const nothingFound = ready && pinned.length === 0 && others.length === 0;
  // A native sidebar swaps the open note, so the stack doesn't grow with every note you look at.
  const replace = variant === "sidebar" && platform === "native";

  return (
    <html.div style={styles.list}>
      <html.div style={styles.header}>
        <html.div style={styles.titleRow}>
          <html.h1 style={styles.title}>Notes</html.h1>
          <Button variant="strong" label="New note" onClick={createNote}>
            New
          </Button>
        </html.div>
        <html.input
          aria-label="Search notes"
          onInput={(event: { target: { value: string } }) => store.setQuery(event.target.value)}
          placeholder="Search"
          style={styles.search}
          type="search"
          value={query}
        />
      </html.div>
      <Scroll>
        <html.div style={styles.rows}>
          {!ready ? <Skeleton /> : null}
          <Section title="Pinned" notes={pinned} replace={replace} />
          <Section title={pinned.length > 0 ? "All notes" : null} notes={others} replace={replace} />
          {nothingFound ? <html.p style={styles.nothing}>{query ? "No notes match your search." : "No notes yet."}</html.p> : null}
        </html.div>
      </Scroll>
      {variant === "sidebar" || platform === "web" ? <html.div style={styles.footer}>{navLinks}</html.div> : null}
    </html.div>
  );
}

function Section({ title, notes, replace }: { title: string | null; notes: Note[]; replace: boolean }) {
  if (notes.length === 0) return null;
  return (
    <html.div style={styles.section}>
      {title ? <html.span style={styles.sectionTitle}>{title}</html.span> : null}
      {notes.map((note) => (
        <Row key={note.id} note={note} replace={replace} />
      ))}
    </html.div>
  );
}

function Row({ note, replace }: { note: Note; replace: boolean }) {
  const { lastCreatedId } = useNotes();
  const { truncate } = useChrome();
  const selected = usePathname() === `/notes/${note.id}`;
  const entered = useEntered();
  const animateIn = note.id === lastCreatedId;

  return (
    <Link to={{ href: "/notes/[id]", params: { id: note.id } }} replace={replace}>
      <html.div style={[styles.row, selected && styles.rowSelected, animateIn && !entered && styles.rowBefore]}>
        <html.span style={[styles.rowTitle, truncate]}>{note.title.trim() || "New note"}</html.span>
        <html.span style={[styles.rowPreview, truncate]}>
          {formatEdited(note.updatedAt)}
          {note.body.trim() ? `  ·  ${firstLine(note.body)}` : ""}
        </html.span>
      </html.div>
    </Link>
  );
}

function firstLine(body: string) {
  return body.trim().split("\n")[0];
}

function Skeleton() {
  return (
    <html.div style={styles.section}>
      {[0, 1, 2].map((key) => (
        <html.div key={key} style={styles.skeletonRow}>
          <html.div style={styles.skeletonTitle} />
          <html.div style={styles.skeletonLine} />
        </html.div>
      ))}
    </html.div>
  );
}

const styles = css.create({
  list: { display: "flex", flexDirection: "column", flex: 1, minHeight: 0 },
  header: { display: "flex", flexDirection: "column", gap: 12, paddingBlock: 16, paddingInline: 16 },
  titleRow: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: -0.3, color: colors.text },
  search: {
    height: 38,
    boxSizing: "border-box",
    paddingInline: 12,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.hover,
    borderWidth: 0,
    borderRadius: 10,
    "::placeholder": { color: colors.muted },
  },
  rows: { display: "flex", flexDirection: "column", gap: 16, paddingInline: 8, paddingBottom: 24 },
  section: { display: "flex", flexDirection: "column", gap: 2 },
  sectionTitle: {
    paddingBlock: 4,
    paddingInline: 10,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: colors.faint,
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingBlock: 10,
    paddingInline: 10,
    borderRadius: 10,
    backgroundColor: { default: "transparent", ":hover": colors.hover },
    transitionProperty: "opacity, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-out",
    opacity: 1,
    transform: "translateY(0px)",
  },
  rowBefore: { opacity: 0, transform: "translateY(-6px)" },
  rowSelected: { backgroundColor: { default: colors.selected, ":hover": colors.selected } },
  rowTitle: { fontSize: 15, fontWeight: 600, lineClamp: 1, color: colors.text },
  rowPreview: { fontSize: 13, lineClamp: 1, color: colors.muted },
  nothing: { margin: 0, paddingBlock: 12, paddingInline: 10, fontSize: 14, color: colors.muted },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingBlock: 14,
    paddingInline: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  skeletonRow: { display: "flex", flexDirection: "column", gap: 8, paddingBlock: 12, paddingInline: 10 },
  skeletonTitle: { width: "55%", height: 12, borderRadius: 6, backgroundColor: colors.hover },
  skeletonLine: { width: "85%", height: 10, borderRadius: 5, backgroundColor: colors.hover },
});
