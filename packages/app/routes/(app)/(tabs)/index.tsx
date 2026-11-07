// Shared: the home screen in every app. Narrow screens show the list here. On wide screens the list
// is in the sidebar, so this shows a prompt instead.
import type { NextRouteOptions } from "@mismo/next";
import type { TanstackRouteOptions } from "@mismo/tanstack";
import { css, html } from "@mismo/ui";

import { NoteList } from "../../../src/notes/components/NoteList.tsx";
import { useChrome } from "../../../src/ui/chrome.tsx";
import { Muted } from "../../../src/ui/primitives.tsx";
import { colors } from "../../../src/ui/tokens.css.ts";

export const next = { metadata: { title: "Mismo Notes" } } satisfies NextRouteOptions;
export const tanstack = { head: () => ({ meta: [{ title: "Mismo Notes" }] }) } satisfies TanstackRouteOptions;

export default function Home() {
  const { platform, useWideLayout } = useChrome();
  const wide = useWideLayout();

  return (
    <>
      {wide !== true ? (
        <html.div style={styles.narrow}>
          <NoteList variant="page" />
        </html.div>
      ) : null}
      {wide !== false ? (
        <html.main style={styles.wide}>
          <html.h2 style={styles.prompt}>Pick a note, or start a new one</html.h2>
          {platform === "web" ? <Muted>Press N for a new note, or / to search.</Muted> : null}
        </html.main>
      ) : null}
    </>
  );
}

const styles = css.create({
  narrow: { display: { default: "flex", "@media (min-width: 840px)": "none" }, flexDirection: "column", flex: 1, minHeight: 0 },
  wide: {
    display: { default: "none", "@media (min-width: 840px)": "flex" },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flex: 1,
  },
  prompt: { margin: 0, fontSize: 18, fontWeight: 600, color: colors.text },
});
