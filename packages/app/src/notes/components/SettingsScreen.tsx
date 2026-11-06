import { css, html } from "react-strict-dom";

import { useNotes } from "../provider.tsx";
import { CreditedPage } from "./CreditedPage.tsx";
import { useChrome } from "../../ui/chrome.tsx";
import { Button, Heading, Muted } from "../../ui/primitives.tsx";
import { colors } from "../../ui/tokens.css.ts";

export function SettingsScreen() {
  const { ready, notes, store } = useNotes();
  const { shareText, confirm } = useChrome();

  return (
    <CreditedPage>
      <Heading>Settings</Heading>
      <Muted>{ready ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} saved on this device.` : " "}</Muted>
      <html.section style={styles.section}>
        <html.div style={styles.text}>
          <html.span style={styles.label}>Export</html.span>
          <html.span style={styles.hint}>Gets a copy of your notes as JSON.</html.span>
        </html.div>
        <Button variant="strong" onClick={() => shareText.run(JSON.stringify(notes, null, 2), "notes.json")}>
          {shareText.label}
        </Button>
      </html.section>
      <html.section style={styles.section}>
        <html.div style={styles.text}>
          <html.span style={styles.label}>Start over</html.span>
          <html.span style={styles.hint}>Replaces your notes with the samples.</html.span>
        </html.div>
        <Button variant="danger" onClick={() => confirm("Replace your notes with the samples?", "Reset", store.resetSamples)}>
          Reset
        </Button>
      </html.section>
    </CreditedPage>
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
