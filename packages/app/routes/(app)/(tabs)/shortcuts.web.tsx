// Only on the web: there's no /shortcuts on native. It can use browser APIs directly.
import { useNav } from "@mismo/core";
import { useEffect } from "react";

import { Body, Page, Title } from "../../../src/ui.tsx";

export default function Shortcuts() {
  const nav = useNav();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "n") nav.go("/");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nav]);

  return (
    <Page>
      <Title>Shortcuts</Title>
      <Body>Press N to go to your notes.</Body>
    </Page>
  );
}
