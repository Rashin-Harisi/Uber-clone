import { Redirect } from "expo-router";

export default function HomeScreen() {
  // @ts-ignore
  return <Redirect href="/(auth)/welcome" />;
}
