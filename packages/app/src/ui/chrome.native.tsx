// Native's side of the chrome: scrolling, the keyboard, and the window's width.
import type { ReactNode } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, Share, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** The height of the native stack's header, below the safe area. */
const HEADER_HEIGHT = 44;

/** The same width as the shared styles' media queries. */
export function useNativeLayout() {
  return useWindowDimensions().width >= 840;
}

export const nativeShareText = {
  label: "Share",
  run: (text: string) => void Share.share({ message: text }),
};

export function nativeConfirm(message: string, action: string, onConfirm: () => void) {
  Alert.alert(message, undefined, [
    { text: "Cancel", style: "cancel" },
    { text: action, style: "destructive", onPress: onConfirm },
  ]);
}

export function NativeScroll({ children }: { children: ReactNode }) {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
      {children}
    </ScrollView>
  );
}

/** Keeps the sidebar clear of the status bar and home indicator. */
export function NativeSafeArea({ children }: { children: ReactNode }) {
  const { top, bottom } = useSafeAreaInsets();
  return <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>{children}</View>;
}

export function NativeKeyboardFrame({ children }: { children: ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={top + HEADER_HEIGHT} style={{ flex: 1 }}>
      {children}
    </KeyboardAvoidingView>
  );
}
