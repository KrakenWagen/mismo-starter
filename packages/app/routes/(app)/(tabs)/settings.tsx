// Shared: one screen in every app. What differs by platform comes from the chrome.
import type { NextRouteOptions } from "@mismo/next";
import type { TanstackRouteOptions } from "@mismo/tanstack";

import { SettingsScreen } from "../../../src/notes/components/SettingsScreen.tsx";

export const next = { metadata: { title: "Settings" } } satisfies NextRouteOptions;
export const tanstack = { head: () => ({ meta: [{ title: "Settings" }] }) } satisfies TanstackRouteOptions;

export default SettingsScreen;
