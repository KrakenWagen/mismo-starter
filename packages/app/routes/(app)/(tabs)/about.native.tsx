// The same URL as about.web.tsx, with a different screen on each platform.
import { Body, Page, Title } from "../../../src/ui.tsx";

export default function About() {
  return (
    <Page>
      <Title>About, on your phone</Title>
      <Body>/about exists everywhere, but each platform has its own screen. This is about.native.tsx.</Body>
    </Page>
  );
}
