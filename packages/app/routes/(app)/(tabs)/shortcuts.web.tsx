// Only on the web: phones don't have keyboard shortcuts, so there's no /shortcuts on native.
import type { NextRouteOptions } from "@mismo/next";
import type { TanstackRouteOptions } from "@mismo/tanstack";
import { css, html } from "react-strict-dom";

import { CreditedPage } from "../../../src/notes/components/CreditedPage.tsx";
import { Heading } from "../../../src/ui/primitives.tsx";
import { colors } from "../../../src/ui/tokens.css.ts";

export const next = { metadata: { title: "Shortcuts" } } satisfies NextRouteOptions;
export const tanstack = { head: () => ({ meta: [{ title: "Shortcuts" }] }) } satisfies TanstackRouteOptions;

const SHORTCUTS = [
  ["N", "New note"],
  ["/", "Search"],
  ["Esc", "Leave the current field"],
  ["?", "Show this page"],
];

export default function Shortcuts() {
  return (
    <CreditedPage>
      <Heading>Keyboard shortcuts</Heading>
      <html.div style={styles.list}>
        {SHORTCUTS.map(([key, action]) => (
          <html.div key={key} style={styles.row}>
            <html.span style={styles.action}>{action}</html.span>
            <html.kbd style={styles.key}>{key}</html.kbd>
          </html.div>
        ))}
      </html.div>
    </CreditedPage>
  );
}

const styles = css.create({
  list: { display: "flex", flexDirection: "column" },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  action: { fontSize: 15, color: colors.text },
  key: {
    minWidth: 28,
    paddingBlock: 3,
    paddingInline: 8,
    fontSize: 13,
    textAlign: "center",
    color: colors.text,
    backgroundColor: colors.hover,
    borderRadius: 6,
  },
});
