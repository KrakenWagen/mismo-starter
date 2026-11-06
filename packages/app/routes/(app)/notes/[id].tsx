// Shared, with a typed param.
import { BackLink, useParams } from "@mismo/core";

import { notes } from "../../../src/notes.ts";
import { Body, Page, Title } from "../../../src/ui.tsx";

export default function NoteScreen() {
  const { id } = useParams("/notes/[id]");
  const note = notes.find((candidate) => candidate.id === id);

  return (
    <Page>
      <Title>{note?.title ?? "Note not found"}</Title>
      {note ? <Body>{note.body}</Body> : null}
      <BackLink fallback="/" label="Back to notes">
        <Body>Back to notes</Body>
      </BackLink>
    </Page>
  );
}
