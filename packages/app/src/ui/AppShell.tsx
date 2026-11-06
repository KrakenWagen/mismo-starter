// The frame around every screen: a sidebar on wide screens, the undo toast, and tidying up empty notes.
import { usePathname } from "@mismo/core";
import { useEffect, type ReactNode } from "react";
import { css, html } from "react-strict-dom";

import { useNotes } from "../notes/provider.tsx";
import { useChrome } from "./chrome.tsx";
import { NoteList } from "./NoteList.tsx";
import { Toast } from "./Toast.tsx";
import { colors } from "./tokens.css.ts";

export function AppShell({ children }: { children: ReactNode }) {
  const { store } = useNotes();
  const { platform, useWideLayout } = useChrome();
  const wide = useWideLayout();
  const pathname = usePathname();

  useEffect(() => {
    store.pruneEmpty(pathname.match(/^\/notes\/(.+)$/)?.[1] ?? null);
  }, [store, pathname]);

  return (
    <html.div style={styles.shell}>
      {wide !== false ? (
        <html.aside style={styles.sidebar}>
          <NoteList variant="sidebar" />
        </html.aside>
      ) : null}
      <html.div style={styles.content}>{children}</html.div>
      <Toast aboveTabs={platform === "native"} />
    </html.div>
  );
}

const styles = css.create({
  shell: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  sidebar: {
    display: { default: "none", "@media (min-width: 840px)": "flex" },
    flexDirection: "column",
    width: 320,
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: colors.line,
    backgroundColor: colors.sidebar,
  },
  content: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0, minHeight: 0 },
});
