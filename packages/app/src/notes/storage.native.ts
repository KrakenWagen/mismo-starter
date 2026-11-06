import AsyncStorage from "@react-native-async-storage/async-storage";

import type { NotesStorage } from "./store.ts";

const KEY = "mismo-starter-notes";

export const nativeStorage: NotesStorage = {
  load: () => AsyncStorage.getItem(KEY),
  save: (value) => void AsyncStorage.setItem(KEY, value),
};
