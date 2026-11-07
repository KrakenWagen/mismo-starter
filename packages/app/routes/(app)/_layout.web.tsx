// The web's shell. Everything specific to the web is passed in here: storage, shortcuts, and a link
// to /shortcuts, which only the web has. Replace what comes from notes/ with your own app.
import { Link, Slot } from "@mismo/core";
import { ViewTransition } from "react";
import { css, html } from "@mismo/ui";

import { useSaveOnPageHide, useShortcuts } from "../../src/notes/behaviour.web.ts";
import { NoteList } from "../../src/notes/components/NoteList.tsx";
import { Toast } from "../../src/notes/components/Toast.tsx";
import { NotesProvider } from "../../src/notes/provider.tsx";
import { webStorage } from "../../src/notes/storage.web.ts";
import { useDropEmptyNotes } from "../../src/notes/useDropEmptyNotes.ts";
import { AppShell } from "../../src/ui/AppShell.tsx";
import { ChromeProvider, type Chrome } from "../../src/ui/chrome.tsx";
import { useWebLayout, webConfirm, WebExternalLink, WebKeyboardFrame, WebScroll, webShareText, webTruncate } from "../../src/ui/chrome.web.tsx";
import { colors } from "../../src/ui/tokens.css.ts";

const styles = css.create({
  footerLink: { fontSize: 14, color: { default: colors.muted, ":hover": colors.text } },
});

const chrome: Chrome = {
  platform: "web",
  Scroll: WebScroll,
  KeyboardFrame: WebKeyboardFrame,
  ExternalLink: WebExternalLink,
  useWideLayout: useWebLayout,
  truncate: webTruncate,
  shareText: webShareText,
  confirm: webConfirm,
  navLinks: (
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
        <AppShell sidebar={<NoteList variant="sidebar" />} overlay={<Toast />}>
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
  useSaveOnPageHide();
  useDropEmptyNotes();
  return null;
}
