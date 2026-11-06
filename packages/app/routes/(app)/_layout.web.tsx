// The web's shell: a header on every page. It links to /shortcuts, which only the web has.
import { Link, Slot } from "@mismo/core";
import { css, html } from "react-strict-dom";

export default function WebLayout() {
  return (
    <html.div>
      <html.nav style={styles.nav}>
        <Link to="/">Notes</Link>
        <Link to="/about">About</Link>
        <Link to="/shortcuts">Shortcuts</Link>
      </html.nav>
      <Slot />
    </html.div>
  );
}

const styles = css.create({
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#e4e4e7",
  },
});
