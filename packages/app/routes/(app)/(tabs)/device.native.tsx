// Only on native: there's no /device on the web. It can use React Native's APIs directly.
import { Platform, useWindowDimensions } from "react-native";

import { Card, Page, Title } from "../../../src/ui.tsx";

export default function Device() {
  const { width, height } = useWindowDimensions();

  return (
    <Page>
      <Title>Device</Title>
      <Card title="Platform">{`${Platform.OS} ${Platform.Version}`}</Card>
      <Card title="Window">{`${Math.round(width)} × ${Math.round(height)}`}</Card>
    </Page>
  );
}
