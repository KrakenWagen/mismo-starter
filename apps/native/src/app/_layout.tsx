import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

// Matches the shared colours in packages/app/src/ui/tokens.css.ts, for what the navigators draw.
const light = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#ffffff", card: "#ffffff", primary: "#b4540a" } };
const dark = { ...DarkTheme, colors: { ...DarkTheme.colors, background: "#17171a", card: "#17171a", primary: "#f5a35c" } };

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? dark : light}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
