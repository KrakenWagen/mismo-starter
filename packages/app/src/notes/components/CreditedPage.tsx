// A scrolling page with the demo's credit at the bottom.
import type { ReactNode } from "react";
import { css, html } from "react-strict-dom";

import { useChrome } from "../../ui/chrome.tsx";
import { Page } from "../../ui/primitives.tsx";
import { colors } from "../../ui/tokens.css.ts";

export function CreditedPage({ children }: { children: ReactNode }) {
  const { Scroll, ExternalLink } = useChrome();

  return (
    <Scroll>
      <html.div style={styles.screen}>
        <Page>{children}</Page>
        <html.p style={styles.credit}>
          Made with ♥ by{" "}
          <ExternalLink href="https://github.com/KrakenWagen">
            <html.span style={styles.link}>KrakenWagen</html.span>
          </ExternalLink>{" "}
          using{" "}
          <ExternalLink href="https://mismo.dev">
            <html.span style={styles.link}>mismo</html.span>
          </ExternalLink>
        </html.p>
      </html.div>
    </Scroll>
  );
}

const styles = css.create({
  // Fills the scrolling area, so the credit sits at the bottom.
  screen: { display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 },
  credit: { margin: 0, paddingBlock: 16, paddingInline: 20, fontSize: 13, textAlign: "center", color: colors.muted },
  link: { fontWeight: 600, color: colors.accent },
});
