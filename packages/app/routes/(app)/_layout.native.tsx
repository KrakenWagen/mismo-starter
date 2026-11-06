// Native's shell: the same shared frame, around a native stack.
import { Link } from "@mismo/core";
import { Stack } from "expo-router";
import { css, html } from "react-strict-dom";

import { NotesProvider } from "../../src/notes/provider.tsx";
import { nativeStorage } from "../../src/notes/storage.native.ts";
import { AppShell } from "../../src/ui/AppShell.tsx";
import { ChromeProvider, type Chrome } from "../../src/ui/chrome.tsx";
import { NativeEditorFrame, NativeScroll, useNativeLayout, useSaveInBackground } from "../../src/ui/chrome.native.tsx";
import { NoteActions } from "../../src/ui/NoteEditor.tsx";
import { colors } from "../../src/ui/tokens.css.ts";

const styles = css.create({
  footerLink: { fontSize: 14, color: colors.muted },
});

const chrome: Chrome = {
  platform: "native",
  Scroll: NativeScroll,
  EditorFrame: NativeEditorFrame,
  useWideLayout: useNativeLayout,
  // Only shows in the wide layout's sidebar, where there's no tab bar.
  listFooter: (
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
        <AppShell>
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
  return null;
}
