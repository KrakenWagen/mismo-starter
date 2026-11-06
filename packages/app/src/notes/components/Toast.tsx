import { useNav } from "@mismo/core";
import { css, html } from "react-strict-dom";

import { useChrome } from "../../ui/chrome.tsx";
import { useNotes } from "../provider.tsx";
import { Button, useEntered } from "../../ui/primitives.tsx";
import { colors } from "../../ui/tokens.css.ts";

/** Offers to bring back the note you just deleted. */
export function Toast() {
  const { removed } = useNotes();
  // Keyed, so a second delete animates in again.
  return removed ? <ToastCard key={removed.id} id={removed.id} /> : null;
}

function ToastCard({ id }: { id: string }) {
  const { store } = useNotes();
  const aboveTabs = useChrome().platform === "native";
  const nav = useNav();
  const entered = useEntered();

  return (
    <html.div style={[styles.anchor, aboveTabs ? styles.aboveTabs : styles.passThrough]}>
      <html.div role="status" style={[styles.toast, !entered && styles.before]}>
        <html.span style={styles.text}>Note deleted</html.span>
        <Button
          variant="onInverse"
          onClick={() => {
            store.undoRemove();
            nav.go({ href: "/notes/[id]", params: { id } });
          }}
        >
          Undo
        </Button>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  anchor: {
    position: "absolute",
    insetInline: 0,
    bottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  aboveTabs: { bottom: 100 },
  // On the web, clicks reach the page beside the toast.
  passThrough: { pointerEvents: "none" },
  toast: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBlock: 8,
    paddingInlineStart: 16,
    paddingInlineEnd: 8,
    borderRadius: 12,
    pointerEvents: "auto",
    backgroundColor: colors.inverse,
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    opacity: 1,
    transform: "translateY(0px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-out",
  },
  before: { opacity: 0, transform: "translateY(10px)" },
  text: { fontSize: 14, color: colors.onInverse },
});
