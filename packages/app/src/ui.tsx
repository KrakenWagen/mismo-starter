import type { ReactNode } from "react";
import { css, html } from "react-strict-dom";

export function Page({ children }: { children: ReactNode }) {
  return <html.main style={styles.page}>{children}</html.main>;
}

export function Title({ children }: { children: ReactNode }) {
  return <html.h1 style={styles.title}>{children}</html.h1>;
}

export function Body({ children }: { children: ReactNode }) {
  return <html.p style={styles.body}>{children}</html.p>;
}

export function Card({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <html.div style={styles.card}>
      <html.span style={styles.cardTitle}>{title}</html.span>
      {children ? <html.span style={styles.cardBody}>{children}</html.span> : null}
    </html.div>
  );
}

const styles = css.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 640,
    marginInline: "auto",
    padding: 20,
    boxSizing: "border-box",
  },
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: "#18181b" },
  body: { margin: 0, fontSize: 16, lineHeight: 1.5, color: "#52525b" },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e4e4e7",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  cardTitle: { fontSize: 16, fontWeight: 600, color: "#18181b" },
  cardBody: { fontSize: 14, lineHeight: 1.4, color: "#52525b" },
});
