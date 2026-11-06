// The same URL as about.native.tsx, with a different screen on each platform.
import { Body, Page, Title } from "../../../src/ui.tsx";

export default function About() {
  return (
    <Page>
      <Title>About, on the web</Title>
      <Body>/about exists everywhere, but each platform has its own screen. This is about.web.tsx.</Body>
    </Page>
  );
}
