// Native's side of the chrome: scrolling, the keyboard, and the window's width.
import { useHeaderHeight } from "expo-router/react-navigation";
import type { ReactNode } from "react";
import { Alert, KeyboardAvoidingView, Linking, ScrollView, Share, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** The same width as the shared styles' media queries. */
export function useNativeLayout() {
  return useWindowDimensions().width >= 840;
}

/** React Strict DOM's <a> doesn't handle href on native. */
export function NativeExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Text accessibilityRole="link" onPress={() => void Linking.openURL(href)}>
      {children}
    </Text>
  );
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
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
  // Includes the status bar, and differs by iOS version: taller with Liquid Glass.
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={headerHeight} style={{ flex: 1 }}>
      {children}
    </KeyboardAvoidingView>
  );
}
