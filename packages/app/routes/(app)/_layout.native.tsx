// Native's shell: the same shared frame, around a native stack.
import { Link } from "@mismo/core";
import { Stack } from "expo-router";
import { css, html } from "react-strict-dom";

import { useSaveInBackground } from "../../src/notes/behaviour.native.ts";
import { NoteActions } from "../../src/notes/components/NoteEditor.tsx";
import { NoteList } from "../../src/notes/components/NoteList.tsx";
import { Toast } from "../../src/notes/components/Toast.tsx";
import { NotesProvider } from "../../src/notes/provider.tsx";
import { nativeStorage } from "../../src/notes/storage.native.ts";
import { useDropEmptyNotes } from "../../src/notes/useDropEmptyNotes.ts";
import { AppShell } from "../../src/ui/AppShell.tsx";
import { ChromeProvider, type Chrome } from "../../src/ui/chrome.tsx";
import { nativeConfirm, NativeExternalLink, NativeKeyboardFrame, NativeSafeArea, NativeScroll, nativeShareText, useNativeLayout } from "../../src/ui/chrome.native.tsx";
import { colors } from "../../src/ui/tokens.css.ts";

const styles = css.create({
  footerLink: { fontSize: 14, color: colors.muted },
});

const chrome: Chrome = {
  platform: "native",
  Scroll: NativeScroll,
  KeyboardFrame: NativeKeyboardFrame,
  ExternalLink: NativeExternalLink,
  useWideLayout: useNativeLayout,
  shareText: nativeShareText,
  confirm: nativeConfirm,
  // Only shows in the wide layout's sidebar, where there's no tab bar.
  navLinks: (
    <Link to="/settings">
      <html.span style={styles.footerLink}>Settings</html.span>
    </Link>
  ),
};

export default function NativeLayout() {
  return (
    <NotesProvider storage={nativeStorage}>
      <ChromeProvider value={chrome}>
        <NativeBehaviour />
        <AppShell
          sidebar={
            <NativeSafeArea>
              <NoteList variant="sidebar" />
            </NativeSafeArea>
          }
          overlay={<Toast />}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Notes" }} />
            <Stack.Screen
              name="notes/[id]"
              options={({ route }) => ({
                title: "",
                headerRight: () => <NoteActions id={(route.params as { id: string }).id} />,
              })}
            />
          </Stack>
        </AppShell>
      </ChromeProvider>
    </NotesProvider>
  );
}

function NativeBehaviour() {
  useSaveInBackground();
  useDropEmptyNotes();
  return null;
}
