// The web's side of the chrome: scrolling, and the styles only the web needs.
import type { ReactNode } from "react";
import { css, html } from "@mismo/ui";

const styles = css.create({
  scroll: { display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflowY: "auto" },
  truncate: { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
});

export function WebScroll({ children }: { children: ReactNode }) {
  return <html.div style={styles.scroll}>{children}</html.div>;
}

export function WebKeyboardFrame({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function WebExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <html.a href={href} target="_blank" rel="noreferrer">
      {children}
    </html.a>
  );
}

export const useWebLayout = () => null;

export const webShareText = {
  label: "Download",
  run(text: string, filename: string) {
    const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },
};

export function webConfirm(message: string, _action: string, onConfirm: () => void) {
  if (window.confirm(message)) onConfirm();
}

export const webTruncate = styles.truncate;
