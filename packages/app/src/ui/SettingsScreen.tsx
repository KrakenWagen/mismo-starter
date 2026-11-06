// /settings is one screen with one difference per platform: how notes leave the app.
import { css, html } from "react-strict-dom";

import { useNotes } from "../notes/provider.tsx";
import { useChrome } from "./chrome.tsx";
import { Button, Heading, Muted, Page } from "./primitives.tsx";
import { colors } from "./tokens.css.ts";

export function SettingsScreen({
  exportLabel,
  exportHint,
  onExport,
  onReset,
}: {
  exportLabel: string;
  exportHint: string;
  onExport: (notesJson: string) => void;
  onReset: (reset: () => void) => void;
}) {
  const { ready, notes, store } = useNotes();
  const { Scroll } = useChrome();

  return (
    <Scroll>
      <Page>
        <Heading>Settings</Heading>
        <Muted>{ready ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} saved on this device.` : " "}</Muted>
        <html.section style={styles.section}>
          <html.div style={styles.text}>
            <html.span style={styles.label}>Export</html.span>
            <html.span style={styles.hint}>{exportHint}</html.span>
          </html.div>
          <Button variant="strong" onClick={() => onExport(JSON.stringify(notes, null, 2))}>
            {exportLabel}
          </Button>
        </html.section>
        <html.section style={styles.section}>
          <html.div style={styles.text}>
            <html.span style={styles.label}>Start over</html.span>
            <html.span style={styles.hint}>Replaces your notes with the samples.</html.span>
          </html.div>
          <Button variant="danger" onClick={() => onReset(store.resetSamples)}>
            Reset
          </Button>
        </html.section>
      </Page>
    </Scroll>
  );
}

const styles = css.create({
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  text: { display: "flex", flexDirection: "column", flex: 1, gap: 2 },
  label: { fontSize: 15, fontWeight: 600, color: colors.text },
  hint: { fontSize: 14, color: colors.muted },
});
