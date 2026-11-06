// Shared: the editor in every app, with a typed param.
import { useParams } from "@mismo/core";

import { NoteEditor } from "../../../src/ui/NoteEditor.tsx";

export default function NoteScreen() {
  const { id } = useParams("/notes/[id]");
  // Keyed, so moving between notes starts each one fresh.
  return <NoteEditor key={id} id={id} />;
}
