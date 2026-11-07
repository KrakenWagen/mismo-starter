// Every colour in the app, for light and dark. Dark mode follows the system.
import { css } from "@mismo/ui";

export const colors = css.defineVars({
  background: { default: "#ffffff", "@media (prefers-color-scheme: dark)": "#17171a" },
  sidebar: { default: "#f7f7f5", "@media (prefers-color-scheme: dark)": "#1f1f23" },
  hover: { default: "#eeeeeb", "@media (prefers-color-scheme: dark)": "#2a2a2f" },
  selected: { default: "#e6e6e2", "@media (prefers-color-scheme: dark)": "#34343a" },
  line: { default: "#e5e5e1", "@media (prefers-color-scheme: dark)": "#303036" },
  text: { default: "#1c1c1e", "@media (prefers-color-scheme: dark)": "#f2f2f3" },
  muted: { default: "#6b6b70", "@media (prefers-color-scheme: dark)": "#a0a0a8" },
  faint: { default: "#9a9a9f", "@media (prefers-color-scheme: dark)": "#6e6e76" },
  accent: { default: "#b4540a", "@media (prefers-color-scheme: dark)": "#f5a35c" },
  danger: { default: "#c02626", "@media (prefers-color-scheme: dark)": "#f87171" },
  inverse: { default: "#1c1c1e", "@media (prefers-color-scheme: dark)": "#f2f2f3" },
  onInverse: { default: "#ffffff", "@media (prefers-color-scheme: dark)": "#1c1c1e" },
});
