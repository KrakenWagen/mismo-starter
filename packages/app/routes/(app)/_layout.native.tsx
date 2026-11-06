// Native's shell uses Expo Router directly: tabs, with notes pushed on top.
import { Stack } from "expo-router";

export default function NativeLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notes/[id]" options={{ title: "Note" }} />
    </Stack>
  );
}
