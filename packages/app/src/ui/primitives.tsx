import { useEffect, useState, type ReactNode } from "react";
import { css, html } from "react-strict-dom";

import { colors } from "./tokens.css.ts";

/** True just after mounting, to animate something in with a transition. */
export function useEntered() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return entered;
}

export function Button({
  children,
  onClick,
  label,
  variant = "plain",
}: {
  children: string;
  onClick: () => void;
  label?: string;
  variant?: "plain" | "strong" | "danger" | "active" | "onInverse";
}) {
  return (
    <html.button aria-label={label} onClick={onClick} style={[styles.button, buttonVariants[variant]]}>
      <html.span style={[styles.buttonText, buttonTextVariants[variant]]}>{children}</html.span>
    </html.button>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <html.h1 style={styles.heading}>{children}</html.h1>;
}

export function Muted({ children }: { children: ReactNode }) {
  return <html.p style={styles.muted}>{children}</html.p>;
}

/** A narrow, readable column for simple pages. */
export function Page({ children }: { children: ReactNode }) {
  return <html.main style={styles.page}>{children}</html.main>;
}

const styles = css.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Without this, native adds the padding on top of minHeight, as the web's default doesn't.
    boxSizing: "border-box",
    minHeight: 34,
    paddingBlock: 6,
    paddingInline: 12,
    borderWidth: 0,
    borderRadius: 8,
    cursor: "pointer",
    transitionProperty: "opacity",
    transitionDuration: "120ms",
    opacity: { default: 1, ":active": 0.6 },
  },
  buttonText: { fontSize: 14, fontWeight: 500 },
  heading: { margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: -0.4, color: colors.text },
  muted: { margin: 0, fontSize: 15, lineHeight: 1.5, color: colors.muted },
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 640,
    boxSizing: "border-box",
    marginInline: "auto",
    paddingBlock: 32,
    paddingInline: 20,
  },
});

const buttonVariants = css.create({
  plain: { backgroundColor: { default: "transparent", ":hover": colors.hover } },
  active: { backgroundColor: colors.selected },
  strong: { backgroundColor: colors.inverse },
  danger: { backgroundColor: { default: "transparent", ":hover": colors.hover } },
  onInverse: { backgroundColor: "transparent", minHeight: 28, paddingBlock: 2, paddingInline: 8 },
});

const buttonTextVariants = css.create({
  plain: { color: colors.text },
  active: { color: colors.text },
  strong: { color: colors.onInverse },
  danger: { color: colors.danger },
  onInverse: { color: colors.onInverse, fontWeight: 700 },
});
