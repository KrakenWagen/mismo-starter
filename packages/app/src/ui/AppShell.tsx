// The frame around every screen: a sidebar on wide screens, the content, and anything floating above.
import type { ReactNode } from "react";
import { css, html } from "@mismo/ui";

import { useChrome } from "./chrome.tsx";
import { colors } from "./tokens.css.ts";

export function AppShell({ sidebar, overlay, children }: { sidebar?: ReactNode; overlay?: ReactNode; children: ReactNode }) {
  const wide = useChrome().useWideLayout();

  return (
    <html.div style={styles.shell}>
      {sidebar && wide !== false ? <html.aside style={styles.sidebar}>{sidebar}</html.aside> : null}
      <html.div style={styles.content}>{children}</html.div>
      {overlay}
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
