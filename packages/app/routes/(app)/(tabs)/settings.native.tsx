// The same URL as settings.web.tsx. On native, notes export through the system share sheet.
import { Alert, Share } from "react-native";

import { SettingsScreen } from "../../../src/ui/SettingsScreen.tsx";

export default function Settings() {
  return (
    <SettingsScreen
      exportLabel="Share"
      exportHint="Sends your notes as text to another app."
      onExport={(message) => void Share.share({ message })}
      onReset={(reset) => {
        Alert.alert("Replace your notes with the samples?", undefined, [
          { text: "Cancel", style: "cancel" },
          { text: "Reset", style: "destructive", onPress: reset },
        ]);
      }}
    />
  );
}
