// What differs by platform inside shared screens. Each platform's layout provides it, so the shared
// files don't import anything platform-specific.
import { createContext, useContext, type ComponentProps, type ComponentType, type ReactNode } from "react";
import type { html } from "react-strict-dom";

export type Chrome = {
  platform: "web" | "native";
  /** A scrolling area: React Strict DOM's elements don't scroll on native. */
  Scroll: ComponentType<{ children: ReactNode }>;
  /** Wraps the editor, to keep it above the keyboard on native. */
  EditorFrame: ComponentType<{ children: ReactNode }>;
  /**
   * Whether the sidebar shows, or null when CSS decides. The web renders both layouts, because the
   * server doesn't know the window's size. Native knows it, so it only renders the one it needs.
   */
  useWideLayout: () => boolean | null;
  /** Cuts text off at one line on the web, where the shared styles' lineClamp has no effect. */
  truncate?: ComponentProps<typeof html.span>["style"];
  /** Links at the bottom of the list, which can include routes only this platform has. */
  listFooter: ReactNode;
};

const ChromeContext = createContext<Chrome | null>(null);

export const ChromeProvider = ChromeContext.Provider;

export function useChrome(): Chrome {
  const chrome = useContext(ChromeContext);
  if (!chrome) throw new Error("useChrome must be used inside ChromeProvider.");
  return chrome;
}
