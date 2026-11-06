// A real native tab bar, with each platform's own system icons: SF Symbols on iOS, and Android's
// built-in drawables.
import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNativeLayout } from "../../../src/ui/chrome.native.tsx";

export default function TabsLayout() {
  const { top } = useSafeAreaInsets();
  // The wide layout's sidebar does the tab bar's job.
  const wide = useNativeLayout();
  const contentStyle = { paddingTop: top };
  // Matches `accent` in src/ui/tokens.css.ts, which the native tab bar can't read.
  const accent = useColorScheme() === "dark" ? "#f5a35c" : "#b4540a";

  return (
    <NativeTabs hidden={wide} tintColor={accent}>
      <NativeTabs.Trigger name="index" contentStyle={contentStyle}>
        <NativeTabs.Trigger.Icon sf="note.text" drawable="ic_menu_edit" />
        <NativeTabs.Trigger.Label>Notes</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings" contentStyle={contentStyle}>
        <NativeTabs.Trigger.Icon sf="gearshape" drawable="ic_menu_preferences" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
