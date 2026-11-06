// The web's shell. Everything specific to the web is passed in here: storage, shortcuts, and a link
// to /shortcuts, which only the web has.
import { Link, Slot } from "@mismo/core";
import { ViewTransition } from "react";
import { css, html } from "react-strict-dom";

import { NotesProvider } from "../../src/notes/provider.tsx";
import { webStorage } from "../../src/notes/storage.web.ts";
import { AppShell } from "../../src/ui/AppShell.tsx";
import { ChromeProvider, type Chrome } from "../../src/ui/chrome.tsx";
import { usePageLifecycle, useShortcuts, useWebLayout, WebEditorFrame, WebScroll, webTruncate } from "../../src/ui/chrome.web.tsx";
import { colors } from "../../src/ui/tokens.css.ts";

const styles = css.create({
  footerLink: { fontSize: 14, color: { default: colors.muted, ":hover": colors.text } },
});

const chrome: Chrome = {
  platform: "web",
  Scroll: WebScroll,
  EditorFrame: WebEditorFrame,
  useWideLayout: useWebLayout,
  truncate: webTruncate,
  listFooter: (
    <>
      <Link to="/settings">
        <html.span style={styles.footerLink}>Settings</html.span>
      </Link>
      <Link to="/shortcuts">
        <html.span style={styles.footerLink}>Shortcuts</html.span>
      </Link>
    </>
  ),
};

export default function WebLayout() {
  return (
    <NotesProvider storage={webStorage}>
      <ChromeProvider value={chrome}>
        <WebBehaviour />
        <AppShell>
          <ViewTransition>
            <Slot />
          </ViewTransition>
        </AppShell>
      </ChromeProvider>
    </NotesProvider>
  );
}

function WebBehaviour() {
  useShortcuts();
  usePageLifecycle();
  return null;
}
