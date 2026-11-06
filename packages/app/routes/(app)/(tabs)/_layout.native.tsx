import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNativeLayout } from "../../../src/ui/chrome.native.tsx";

export default function TabsLayout() {
  const { top } = useSafeAreaInsets();
  // The wide layout's sidebar does the tab bar's job.
  const wide = useNativeLayout();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { paddingTop: top, backgroundColor: "transparent" },
        tabBarIcon: () => null,
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: { fontSize: 15, fontWeight: "600" },
        tabBarStyle: wide ? { display: "none" } : undefined,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Notes" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
