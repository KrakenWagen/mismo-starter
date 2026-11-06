// The same URL as settings.native.tsx. On the web, notes export as a file download.
import type { NextRouteOptions } from "@mismo/next";
import type { TanstackRouteOptions } from "@mismo/tanstack";

import { SettingsScreen } from "../../../src/ui/SettingsScreen.tsx";

export const next = { metadata: { title: "Settings" } } satisfies NextRouteOptions;
export const tanstack = { head: () => ({ meta: [{ title: "Settings" }] }) } satisfies TanstackRouteOptions;

function download(notesJson: string) {
  const url = URL.createObjectURL(new Blob([notesJson], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "notes.json";
  link.click();
  URL.revokeObjectURL(url);
}

export default function Settings() {
  return (
    <SettingsScreen
      exportLabel="Download"
      exportHint="Saves your notes as a JSON file."
      onExport={download}
      onReset={(reset) => {
        if (window.confirm("Replace your notes with the samples?")) reset();
      }}
    />
  );
}
