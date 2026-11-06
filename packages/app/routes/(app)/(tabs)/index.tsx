// Shared: this one file is the home screen in every app.
import { Link } from "@mismo/core";

import { notes } from "../../../src/notes.ts";
import { Card, Page, Title } from "../../../src/ui.tsx";

export default function Notes() {
  return (
    <Page>
      <Title>Notes</Title>
      {notes.map((note) => (
        <Link key={note.id} to={{ href: "/notes/[id]", params: { id: note.id } }}>
          <Card title={note.title} />
        </Link>
      ))}
    </Page>
  );
}
