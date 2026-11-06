// Native's parts of the shell: scrolling, the keyboard, and saving when the app is backgrounded.
import { useEffect, type ReactNode } from "react";
import { AppState, KeyboardAvoidingView, ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNotes } from "../notes/provider.tsx";

/** The height of the native stack's header, below the safe area. */
const HEADER_HEIGHT = 44;

/** The same width as the shared styles' media queries. */
export function useNativeLayout() {
  return useWindowDimensions().width >= 840;
}

export function NativeScroll({ children }: { children: ReactNode }) {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
      {children}
    </ScrollView>
  );
}

export function NativeEditorFrame({ children }: { children: ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={top + HEADER_HEIGHT} style={{ flex: 1 }}>
      {children}
    </KeyboardAvoidingView>
  );
}

export function useSaveInBackground() {
  const { store } = useNotes();
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") store.flush();
    });
    return () => subscription.remove();
  }, [store]);
}
