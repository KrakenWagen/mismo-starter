// What the notes do only on native: saving when the app goes to the background.
import { useEffect } from "react";
import { AppState } from "react-native";

import { useNotesStore } from "./provider.tsx";

export function useSaveInBackground() {
  const store = useNotesStore();
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") store.flush();
    });
    return () => subscription.remove();
  }, [store]);
}
