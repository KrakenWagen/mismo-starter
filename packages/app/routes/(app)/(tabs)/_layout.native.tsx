import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Notes" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
      <Tabs.Screen name="device" options={{ title: "Device" }} />
    </Tabs>
  );
}
